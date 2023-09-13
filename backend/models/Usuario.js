const {model, Schema} = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const usuariosSchema = new Schema({
  nombre: String,
  nombreUsuario: {
    type: String,
    unique: true
  },
  passwordHash: String,
  admin: Boolean
})

// Transformamos el toJSON para poder quitar _id y __v
usuariosSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v

    // IMPORTANTE NO DEVOLVER LA CONTRASEÑA DEL USUARIO
    delete returnedObject.passwordHash
  }
})

usuariosSchema.plugin(uniqueValidator)

const Usuario = model('Usuario', usuariosSchema)

module.exports = Usuario