const fs = require('fs');

fs.writeFile('./test.txt', 'this is a test!', 'utf8', err => {  //写文件
    if(err) throw err;
    console.log('done!'); 
});

fs.rename('./test.txt', 'c.txt', err => {  //文件重命名
    if(err) throw err;
    console.log('done!');
});

fs.unlink('./c.txt', err => {  //删除文件
    if(err) throw err;
    console.log('done!');
});