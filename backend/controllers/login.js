const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
const loginRouter = require('express').Router()
const Usuario = require('../models/Usuario')

loginRouter.use(bodyParser.json())

console.log(process.env.EMAIL_USER,process.env.EMAIL_PASS)

// Configuración de nodemailer
// const transporter = nodemailer.createTransport({
//   service: 'gmail', // Puedes usar otros servicios como Outlook, Yahoo, etc.
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// })

// console.log(transporter)

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

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Recuperación de contraseña gestion entescultor',
      text: 'Haz clic en el siguiente enlace para recuperar tu contraseña: [enlace de recuperación]'
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

  } catch (err) { next(err) }
})

module.exports = loginRouter