const {normalize} = require('path');  // 整理路径
console.log(normalize('/user/bin//a.js'));
console.log(normalize('/user/bin/../a.js'));