const app = require('./app')
const { initializeDatabase } = require('./config/database')

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

initializeDatabase()