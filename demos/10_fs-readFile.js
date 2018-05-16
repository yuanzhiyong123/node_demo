const fs = require('fs');

fs.readFile('./10_fs-readFile.js','utf-8', (err, data) => {  //异步读取文件
    if(err) throw err;
    console.log(data);
});

const data = fs.readFileSync('./1_demo.js', 'utf8');  //同步读取文件
console.log(data);