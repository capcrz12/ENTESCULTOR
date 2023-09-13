const {model, Schema} = require('mongoose')

const articulosSchema = new Schema({
  title: String,
  fecha: String,
  texto: String,
  image: String,
  url: String
})

// Transformamos el toJSON para poder quitar _id y __v
articulosSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Articulo = model('Articulo', articulosSchema)

module.exports = Articulo