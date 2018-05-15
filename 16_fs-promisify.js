const fs = require('fs');
const promisify = require('util').promisify;

const  readFile = promisify(fs.readFile);  //promise 化  大于v8.0版本

readFile('./16_fs-promisify.js').then((data) => {  
    console.log(data);
}).catch((err) => {
    console.log(err);
});