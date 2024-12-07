const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const Usuario = require('../models/Usuario')

// Comprobamos si el usuario y la contraseña existen y son correctos
loginRouter.post('/', async (request, response, next) => {
  try {
    const { body } = request
    const { nombreUsuario, password } = body

    const usuario = await Usuario.findOne({nombreUsuario})

    const passwordCorrecto = usuario === null
      ? false
      : await bcrypt.compare(password, usuario.passwordHash)

    if (!(usuario && passwordCorrecto)) {
      response.status(401).json({
        error: 'Usuario o contraseña inválido'
      })
    }

    const userForToken = {
      id: usuario._id,
      nombreUsuario: usuario.nombreUsuario
    }

    const token = jwt.sign(
      userForToken, 
      process.env.SECRET,
      {
        expiresIn: 60 * 60 * 24   // El token expira en 1 día
      }
    )


    response.send({
      nombre: usuario.nombre,
      nombreUsuario: usuario.nombreUsuario,
      token
    })
  } catch (err) { next(err)} 
})

loginRouter.post('/email', async (request, response, next) => {
  try {
    const { email } = request.body
    const usuario = await Usuario.findOne({email})

    if(!usuario) {
      response.status(401).json({
        error: 'Este correo electrónico no está registrado'
      })
    }

    response.send({
      email: usuario.email
    })

  } catch (err) { next(err) }
})

module.exports = loginRouter