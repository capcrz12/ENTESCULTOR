const {model, Schema} = require('mongoose')

const obrasSchema = new Schema({
  title: String,
  url: String,
  material: String,
  largo: Number,
  ancho: Number,
  alto: Number,
  serieId: {
    type: Schema.Types.ObjectId,
    ref: 'Serie'
  }
})

// Transformamos el toJSON para poder quitar _id y __v
obrasSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Obra = model('Obra', obrasSchema)

module.exports = Obra