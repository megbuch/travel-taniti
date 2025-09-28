require('dotenv').config()
const express = require('express')
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

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  })
}

initializeDatabase()