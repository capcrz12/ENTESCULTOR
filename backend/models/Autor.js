const {model, Schema} = require('mongoose')

const autorSchema = new Schema({
  texto: String,
  image: String
})

// Transformamos el toJSON para poder quitar _id y __v
autorSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Autor = model('Autor', autorSchema)

module.exports = Autor