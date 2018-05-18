const http = require('http');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const url = require('url');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const files = promisify(fs.readdir);

const config = {
    host: '127.0.0.1',
    port: 8081,
    root: process.cwd()
}
const server = http.createServer((req, res) => {
    const filePath = path.join(config.root, url.parse(req.url).pathname);
    res.statusCode = 200;
    stat(filePath).then((stat) => {
        if (stat.isDirectory()) {
            files(filePath).then((files) => {
                res.setHeader('Content-type', 'text/plain');
                res.end(files.join(','));
            }).catch(err => {
                console.log(err);
                res.setHeader('Content-type', 'text/plain');
                res.end(`${filePath} is no a directory or a file`);
            });
        } else if (stat.isFile()) {
            fs.createReadStream(filePath).pipe(res);
        }
    }).catch((err) => {
        console.log(err);
        res.setHeader('Content-type', 'text/plain');
        res.end(`${filePath} is no a directory or a file`);
    });
    fs.stat(filePath, (err, stat) => {
        if (err) {

        }

    });
});

server.listen(config.port, config.host, () => {
    const addr = `http://${config.host}:${config.port}`
    console.log(`run at ${chalk.green(addr)}`);
});

