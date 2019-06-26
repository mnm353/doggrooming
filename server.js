const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const controller = require('./server/controller');
require('dotenv').config();

const app = express();

massive(process.env.CONNECTION_STRING)
.then((dbInstance) =>{
    app.set('db', dbInstance)
    console.log('db is connected')
})
.catch((err)=>{
    console.log('db not connected')
})

app.use(cors())
app.use(bodyParser.json())

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
app.get('/api/test', (req, res, next)=>{
    res.send('This worked!')
})

const port = process.env.PORT || 8065;
app.listen(port, () => {
    console.log('Listening on port ${port}')
})

