const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = "123abc!"

bcrypt.genSalt(12,(err1,salt)=>{
    bcrypt.hash(password,salt,(err2,hash)=>{
        console.log(hash);
    });
});

var hash = '$2a$12$JSuE3AvKnKgdFsl/FbKSDuzVAR3qQ5PpU2eSaGAmk0lf5CVLuacPO'

bcrypt.compare(password,hash,(err,res)=>{
    console.log(res);
});
/* var data = {
    id: 10
};



var token = jwt.sign(data, '123abc');
console.log(token);
var decoded = jwt.verify(token,'123abc');
console.log(decoded); */


/* var message = 'Lorem ipsum dolor sit amet'

var hashed = SHA256(message).toString();
console.log('Message:' , message);
console.log('Hash:' , hashed);

var data = {
    id: 4
};

var token = {
    data,
    hash: SHA256(JSON.stringify(data) + 'SALT').toString()
};

//Start of man in the middle
//token.data.id = 5;
//token.hash = SHA256(JSON.stringify(token.data)).toString();
//End of man in the middle

var resultHash = SHA256(JSON.stringify(token.data) + 'SALT').toString();

if (resultHash === token.hash) {
    console.log('Data was not changed. => TRUST!');
} else {
    console.log('Data was changed. => DO NOT TRUST!');
} */

