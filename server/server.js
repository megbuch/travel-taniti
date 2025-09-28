require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const { initializeDatabase } = require('./config/database')

app.use(express.json())

app.use('/api/authentications', require('./routes/authentications'))
app.use('/api/users', require('./routes/users'))
app.use('/api/roomTypes', require('./routes/roomTypes'))
app.use('/api/accommodations', require('./routes/accommodations'))
app.use('/api/restaurants', require('./routes/restaurants'))
app.use('/api/activities', require('./routes/activities'))
app.use('/api/bookings', require('./routes/bookings'))
app.use('/api/unsplash', require('./routes/unsplash'))

app.use(express.static(path.join(__dirname, '../client/build')))
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
})

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

initializeDatabase()