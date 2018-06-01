function getData() {
    return new Promise((resolve, reject) => {
        resolve('hello world');
    });
}

async function show() {
    let data = await getData();
    console.log(data);
}

// show();
console.log(show())