const {model, Schema} = require('mongoose')

const criticasSchema = new Schema({
  autor: String,
  fecha: String,
  texto: String
})

// Transformamos el toJSON para poder quitar _id y __v
criticasSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Critica = model('Critica', criticasSchema)

module.exports = Critica