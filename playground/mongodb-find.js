//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    var db = client.db('TodoApp');

/*     db.collection('Todos').find({
        _id: new ObjectID('5b270531e7026c2f5cfa3475')
    }).toArray().then((docs)=>{
        console.log('Todos');
        console.log(JSON.stringify(docs,undefined,2));
    },(err) => {
        if (err) {
            console.log('Unable to fetch Todos', err);
        }
    }) */


    /* db.collection('Todos').find().count().then((count)=>{
        console.log(`Todos count: ${count}`);
    },(err) => {
        if (err) {
            console.log('Unable to count Todos', err);
        }
    }) */

    db.collection('Users').find({name: 'Bruno'}).toArray().then((docs)=>{
        console.log(JSON.stringify(docs,undefined,2));
    },(err) => {
        if (err) {
            console.log('Unable to fetch Users', err);
        }
    })

    //client.close();
});