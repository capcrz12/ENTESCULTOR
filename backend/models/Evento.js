const {model, Schema} = require('mongoose')

const eventosSchema = new Schema({
  title: String,
  fecha: String,
  nota: String,
  url: String,
  enlace: String,
  images: [{
    type: String
  }]
})

// Transformamos el toJSON para poder quitar _id y __v
eventosSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Evento = model('Evento', eventosSchema)

module.exports = Evento