const mongoose = require('mongoose')

const connectionString = process.env.MONGO_DB_URI

mongoose.connect(connectionString)
  .then(() => {
    console.log('Database connected')
  }).catch(err => {
    console.error(err)
  })


process.on('uncaughtException', error => {
  console.error(error)
  mongoose.disconnect()
})