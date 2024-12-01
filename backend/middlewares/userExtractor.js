const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
  // Recuperamos el token del login para poder añadir imagenes
  // Para recuperar la cabecera authorization en express
  const authorization = request.get('authorization')
  let token = ''

  // La cabecera sería: "Bearer ..."
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    // Nos quedamos con el token, que empieza a partir del séptimo caracter (eliminamos "Bearer ")
    token = authorization.substring(7)
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'Falta el token o es inválido' })
  }

  next()
}
