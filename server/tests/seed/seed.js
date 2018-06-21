const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneID = new ObjectID();
const userTwoID = new ObjectID();
const users = [{
    _id: userOneID,
    email: 'a@abc.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneID.toHexString(), access: 'auth'}, '123abc').toString()
        }]
    }, {
    _id: userTwoID,
    email: 'b@abc.com',
    password: 'userTwoPass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userTwoID.toHexString(), access: 'auth'}, '123abc').toString()
        }]
    }];

const todos = [{
    _id: new ObjectID(),
    text: 'Get the dog to the vet',
    _creator: userOneID,
    }, {
    _id: new ObjectID(),
    text: 'Cook dinner',
    completed: false,
    completedAt: 333,
    _creator: userTwoID,
    }];

const populateTodos = (done)=>{
    Todo.remove({}).then(()=>{
        return Todo.insertMany(todos);
    }).then(()=>done());
};

const populateUsers = (done) => {
    User.remove({}).then(()=>{
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne,userTwo])
    }).then(()=>done()); 
};

module.exports = {todos, populateTodos, users, populateUsers};
