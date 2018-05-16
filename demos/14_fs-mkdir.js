const fs = require('fs');
fs.mkdir('test', err => {  //创建文件夹
    if (err) throw err;
    console.log('done!');
});

fs.rmdir('test', err => {  //删除文件夹
    if (err) throw err;
    console.log(err)
}) 