//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    var db = client.db('TodoApp');

    //findOneAndReplace
    /* db.collection('Todos').findOneAndReplace({
        _id: new ObjectID('5b271c13dd1f64fb94971f6a')
    }, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
        }
    ).then((result)=>{
        console.log(result);//JSON.stringify(result,undefined,2));
    });
 */

    db.collection('Users').findOneAndReplace({
        _id: ObjectID('5b2710efdd1f64fb94971a3a')
    },{
        $set: {
            name: 'Bruno'
        },
        $inc: {
            age: 1
        }
    },{
        returnOriginal: false
    }).then((result)=>{
        console.log(result);
    },(err)=>{
        console.log(err);
    });
    //client.close();
});