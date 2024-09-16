const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('hello Roger');
});

const port = 8080;

app.listen(process.env.port || port)
console.log('Web server is listing at port '+ (process.env.port || port))
