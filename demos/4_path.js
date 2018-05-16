const path = require('path');

const filePath = '/user/bin/a.js';

console.log(path.basename(filePath));
console.log(path.dirname(filePath));
console.log(path.extname(filePath));

let pathObj = path.parse(filePath);
console.log(pathObj);
// pathObj.ext = '.txt';
pathObj.base = 'a.txt';
console.log(pathObj);
console.log(path.format(pathObj));
