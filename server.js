const express = require('express')
const app = express()
const lesson1Controller = require('./controllers/lesson1')

app.get('/', lesson1Controller.emilyroute);

app.get('/hanna', lesson1Controller.hannaroute);

const port = 8080;

app.listen(process.env.port || port)
console.log('Web server is listing at port '+ (process.env.port || port))
