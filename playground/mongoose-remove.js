const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

Todo.remove({}).then((res)=>{
    console.log(res)
});

Todo.findOneAndRemove({
    _id: '5b290a2167a35b00142d1e18'
}.then(todo)=>{
    console.log('Todo removed', todo);
})

Todo.findByIdAndRemove('5b290a2167a35b00142d1e18').then((todo)=>{
    console.log('Todo removed', todo);
});