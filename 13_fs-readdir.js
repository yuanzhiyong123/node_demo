const fs = require('fs');

fs.readdir('./', (err, files) => {  //读取目录  返回当前目录所有文件名 数组格式
    console.log(files);
});

fs.readdir(__dirname, (err, files) => {
    console.log(files);
});
