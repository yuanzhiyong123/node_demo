const fs = require('fs');

fs.stat('./11_fs-stat.js', (err, stat) => {
    if(err) throw err;
    console.log(stat.isDirectory());
    console.log(stat.isFile());
});