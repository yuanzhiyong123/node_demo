console.log(Buffer.byteLength('test'));  //buffer 的长度
console.log(Buffer.byteLength('你好'));

const buf = Buffer.from('test');
console.log(Buffer.isBuffer(buf));  //判断是不是buffer
console.log(Buffer.isBuffer('a'));

const buf2 = Buffer.from('hello ');

const buf3 = Buffer.concat([buf2,buf]);  //合并buffer  并且只能输入数组格式
console.log(buf3.toString());