const ERROR_HANDLERS = {
  CastError: res => 
    res.status(400).send({ error: 'Id used is malformed'}),

  ValidationError: (res, { message }) =>
    res.status(409).send({ error: message }),

  JsonWebTokenError: (res) =>
    res.status(401).json({ error: 'El token es inválido' }),

  TokenExpirerError: (res) =>
    res.status(401).json({ error: 'El token ha expirado' }),

  MulterError: (error, res) => {
    const message = `este es el unexpected field -> ${error.field}`
    console.log(message)
    res.status(500).send(message)
  },

  defaultError: res => res.status(500).end()
}


module.exports = (error, request, response) => {
  console.error(error.name)
  const handler = 
    ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError

  handler(response, error)
}