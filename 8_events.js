const EventEmiter = require('events');  //引入事件模块

class myEmiter extends EventEmiter {};  //定义类并继承事件

const em = new myEmiter();  //实例化

em.on('test', function(data) {  //监听事件 并执行某些操作
    console.log(data);
});

em.once('test2', () => {  //只监听一次 ， 执行后注销
    console.log('once');
});

setInterval(() => {
    em.emit('test', 'hello');  //触发事件， 并传写参数
    em.emit('test2');
}, 1000)