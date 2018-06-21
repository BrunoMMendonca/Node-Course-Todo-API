const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {ObjectID} = require('mongodb');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed')

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos',()=>{
    it('should create a new todo',(done)=>{
        var text =  'Test todo';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res)=>{
                expect(res.body.text).toBe(text);
            })
            .end((err,res)=>{
                if (err) {
                    return done(err);
                }
                Todo.find({text}).then((todos)=>{
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e)=>done(e));
            });
    });

    it('should not create todos with invalid data',(done)=>{
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err,res)=>{
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos)=>{
                    expect(todos.length).toBe(3);
                    done();
                }).catch((e)=>done(e));
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos',(done)=>{
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) =>{
                expect(res.body.todos.length).toBe(3);
            })
            .end(done);
    });

});

describe('GET /todos/:id', () => {
    it('should return todo doc',(done)=>{
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done)=>{
        var hexID = new ObjectID();
        request(app)
            .get(`/todos/${hexID.toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if not object id', (done)=>{
        var hexID = new ObjectID();
        request(app)
            .get(`/todos/123`)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {

    it('should remove a todo doc',(done) => {
        var hexID = todos[2]._id.toHexString();
        request(app)
            .delete(`/todos/${hexID}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexID);
            })
            .end((err, res)=>{
                if (err) {
                    return done(err);
                }

                Todo.findById(hexID).then((todo) => {
                    expect(todo).toBeFalsy();
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should return 404 if todo not found', (done)=>{
        var hexID = new ObjectID();
        request(app)
            .delete(`/todos/${hexID.toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if not object id', (done)=>{
        var hexID = new ObjectID();
        request(app)
            .delete(`/todos/123`)
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    
    it('should update a todo',(done) => {
        var hexID = todos[0]._id.toHexString();
        var text = 'test 1 - OK';

        request(app)
            .patch(`/todos/${hexID}`)
            .send({
            text,
            completed : true
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(typeof res.body.todo.completedAt).toBe('number');
            })
            .end(done);
    });

    it('should clear completedAt when todo is not completed',(done) => {
        var hexID = todos[1]._id.toHexString();
        var text = 'test 2 - OK';
        
        request(app)
            .patch(`/todos/${hexID}`)
            .send({
                text,
                completed: false
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toBe(null);
            })
            .end(done);

    });
});

describe('GET /users/me', () => {

    it('shoud return a user if authenticated', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done);
    });

    it('should return 401 if not authenticated', (done) => {
        request(app)
            .get('/users/me')
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({});
            })
            .end(done);
    });

});

describe('POST /users',() => {

    it('should create a user', (done) => {
        var email = 'c@abc.com';
        var password = '654321';
        request(app)
        .post('/users')
        .send({email,password})
        .expect(200)
        .expect((res)=>{
            expect(res.headers['x-auth']).toBeTruthy();
            expect(typeof res.body._id).toBeTruthy();
            expect(res.body.email).toBe(email);
        })
        .end((err)=>{
            if (err) {
                return done(err);
            }
            User.findOne({email}).then((user)=>{
                expect(user).toBeTruthy();
                expect(user.password).not.toBe(password);
                done();
            }).catch((e)=>done(e));
        });
    });

    it('should return validation errors if email or password are not valid', (done) => {
        var email = 'cabc.com';
        var password = '6';

        request(app)
        .post('/users')
        .send({email,password})
        .expect(400)
        .end(done);
    });

    it('should not create user if email is in use', (done) => {
        var email = 'b@abc.com';
        var password = '123456';

        request(app)
        .post('/users')
        .send({
            email: users[0].email,
            password: users[0].password
        })
        .expect(400)
        .end(done);
    });
});