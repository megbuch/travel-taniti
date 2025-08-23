require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json())

app.use('/api/authentications', require('./routes/auth'));

const port = process.env.PORT || 3001;
app.listen(port)