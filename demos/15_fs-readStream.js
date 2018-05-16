const fs = require('fs');

const rs = fs.createReadStream('./15_fs-readStream.js');  //可读流

// rs.pipe(process.stdout);

const ws = fs.createWriteStream('./test.txt');  //可写流

timer = setInterval(() => {
    let num = Math.floor(Math.random() * 10);
    if(num < 9) {
        console.log(num);
        ws.write(num + '');
    }else {
        ws.end();
        clearInterval(timer);
    }
}, 500);

ws.on('finish', () => {
    console.log('done!');
});