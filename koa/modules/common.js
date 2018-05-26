module.exports = {
    getPostData(ctx) {
        return new Promise((resolve, reject) => {
            try {
                let data = '';
                ctx.req.on('data', chunk => {
                    data += chunk;
                });

                ctx.req.on('end', () => {
                    resolve(data);
                });
            } catch (err) {
                reject(err);
            }
        });
    }
}