const EventEmitter = require('events');

class myEmitter extends EventEmitter {};

const em =new myEmitter();

function fn1() {
    console.log('fn1');
    setTimeout(() => {
        em.removeAllListeners('test');  //移出所有绑定事件
    }, 3000);
}
function fn2() {
    console.log('fn2');
    em.removeListener('test', fn1);  //解除绑定单一事件
}
em.on('test', fn1);
em.on('test', fn2);

setInterval(() => {
    em.emit('test');
}, 1000);