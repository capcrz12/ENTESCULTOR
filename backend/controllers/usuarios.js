const bcrypt = require('bcrypt')
const usuariosRouter = require('express').Router()
const Usuario = require('../models/Usuario')
const userExtractor = require('../middlewares/userExtractor')



usuariosRouter.get('/', async (request, response, next) => {
  try {
    const usuarios = await Usuario.find({})
    response.json(usuarios)
  } catch (err) { next(err)}
})

usuariosRouter.post('/', userExtractor, async (request, response, next) => {
  try {
    const {body} = request
    const {nombreUsuario, nombre, password} = body

    // Complejidad algoritmica con la que se hashea la contraseña
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const usuario = new Usuario({
      nombreUsuario,
      nombre,
      passwordHash
    }) 

    const savedUsuario = await usuario.save()

    response.json(savedUsuario)
  } catch (err) { next(err)}
})

module.exports = usuariosRouter