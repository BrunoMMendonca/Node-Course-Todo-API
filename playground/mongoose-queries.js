const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5b284b128fdc73182984fe7d';
var id2 = '5b27c1db09fa0cb429d1a79f';

if (!ObjectID.isValid(id)) {
    console.log('ID not valid!');
}

/* Todo.find({
    _id: id
}).then((todos)=>{
    console.log('Todos', todos);
});

Todo.findOne({
    _id: id
}).then((todo)=>{
    console.log('Todo', todo);
}); */

Todo.findById(id).then((todo)=>{
    if (!todo) {
        return console.log('ID not found');
    }
    console.log('Todo',todo);
}).catch((e)=>console.log(e));


User.findById(id2).then((user)=>{
    if (!user) {
        return console.log('ID not found');
    }
    console.log('User',user);
}).catch((e)=>console.log(e));