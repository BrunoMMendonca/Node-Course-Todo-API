//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    var db = client.db('TodoApp');

    //deleteOne
    /* db.collection('Todos').deleteOne({text:'Eat lunch'}).then((result)=>{
        console.log(result);
    }); */

    //deleteMany
    /* db.collection('Todos').deleteMany({text:'Eat lunch'}).then((result)=>{
        console.log(result);
    },(err)=>{
        console.log(err);
    }); */

    //findOneAndDelete
    /* db.collection('Todos').findOneAndDelete({completed: false}).then((result)=>{
        console.log(result);
    }); */

    /* db.collection('Users').deleteMany({name:'Bruno'}).then((result)=>{
        console.log(result);
    }); */

    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('5b2710d5dd1f64fb94971a28')
        }).then((result)=>{
        console.log(result);
    });

    //client.close();
});