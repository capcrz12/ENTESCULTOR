const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const loginRouter = require('express').Router()
const Usuario = require('../models/Usuario')

//Configuración de nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

console.log('Transporter configurado:', transporter)

// Comprobamos si el usuario y la contraseña existen y son correctos
loginRouter.post('/', async (request, response, next) => {
  try {
    const { body } = request
    const { nombreUsuario, password } = body

    const usuario = await Usuario.findOne({ nombreUsuario })

    const passwordCorrecto = usuario === null
      ? false
      : await bcrypt.compare(password, usuario.passwordHash)

    if (!(usuario && passwordCorrecto)) {
      return response.status(401).json({
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
  } catch (err) {
    console.error('Error en la ruta de login:', err)
    next(err)
  }
})

loginRouter.post('/email', async (request, response, next) => {
  try {
    const { email } = request.body
    console.log('Recuperación de contraseña solicitada para:', email)

    const usuario = await Usuario.findOne({ email })

    if (!usuario) {
      return response.status(401).json({
        error: 'Este correo electrónico no está registrado'
      })
    }

    const token = jwt.sign({ id: usuario._id }, process.env.SECRET, { expiresIn: '1h' })


    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Recuperación de contraseña gestion entescultor',
      text: `Haz clic en el siguiente enlace para recuperar tu contraseña: ${process.env.FRONTEND_URL}reset?token=${token}`
    }

    console.log('Enviando correo de recuperación a:', email)
    console.log('Contenido del correo:', mailOptions)

    try {
      await transporter.sendMail(mailOptions)
      response.status(200).send('Correo de recuperación enviado')
    } catch (error) {
      console.error('Error enviando el correo de recuperación:', error)
      response.status(500).send('Error enviando el correo de recuperación')
    }

  } catch (err) {
    console.error('Error en la ruta de recuperación de contraseña:', err)
    next(err)
  }
})

loginRouter.post('/reset-password', async (request, response, next) => {
  try {
    const { token, newPassword } = request.body

    const decoded = jwt.verify(token, process.env.SECRET)
    const usuario = await Usuario.findById(decoded.id)

    if (!usuario) {
      return response.status(401).json({
        error: 'Token inválido o expirado'
      })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(newPassword, saltRounds)

    usuario.passwordHash = passwordHash
    await usuario.save()

    response.status(200).send('Contraseña actualizada correctamente')
  } catch (err) {
    console.error('Error en la ruta de cambio de contraseña:', err)
    next(err)
  }
})

loginRouter.post('/check-token', async (request, response, next) => {
  try {
    const { token } = request.body
    jwt.verify(token, process.env.SECRET)
    response.status(200).send('Token válido')
  } catch (err) {
    console.error('Error en la ruta de verificación de token:', err)
    next(err)
  }
}) 

module.exports = loginRouter