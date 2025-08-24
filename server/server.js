require('dotenv').config()
const express = require('express')
const app = express()
const { initializeDatabase } = require('./config/database')
const { createAdmin } = require('./scripts/createAdmin')

app.use(express.json())

app.use('/api/authentications', require('./routes/authentications'))
app.use('/api/users', require('./routes/users'))

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
initializeDatabase()