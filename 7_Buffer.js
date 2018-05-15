const buf = Buffer.from('中文字符串！');
console.log(buf.toString());
for(let i = 0; i < buf.length; i += 5) {
    console.log(buf[i].toString());
}