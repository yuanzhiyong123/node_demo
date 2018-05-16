const path = require('path');
console.log(path.join('user','bin','a.js'));  //拼接路径
console.log(path.join('/user','//bin','a.js/'));  //path.join  可以把不正确的路径拼接成完整路径


console.log(path.resolve('./'));  //path.resolve 可以把相对路径转换为绝对路径

