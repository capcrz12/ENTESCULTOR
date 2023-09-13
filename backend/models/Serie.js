const {model, Schema} = require('mongoose')

const seriesSchema = new Schema({
  name: String,
  image: String,
  obras: [{
    type: Schema.Types.ObjectId,
    ref: 'Obra'
  }]
})

// Transformamos el toJSON para poder quitar _id y __v
seriesSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Serie = model('Serie', seriesSchema)

module.exports = Serie