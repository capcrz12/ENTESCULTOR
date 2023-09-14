// Para utilizar las variables de entorno (fichero .env)
require('dotenv').config()

// Conectarse a la base de datos
require('./mongo')

const express = require('express')

const app = express()
const cors = require('cors')

// Obtenemos los middlewares
const notFound = require('./middlewares/notFound')
const handlerErrors = require('./middlewares/handlerErrors')

// Obtenemos los controladores
const seriesRouter = require('./controllers/series')
const obrasRouter = require('./controllers/obras')
const autorRouter = require('./controllers/autor')
const articulosRouter = require('./controllers/articulos')
const eventosRouter = require('./controllers/eventos')
const criticasRouter = require('./controllers/criticas')
const usuariosRouter = require('./controllers/usuarios')
const loginRouter = require('./controllers/login')


app.use(express.json())
app.use(cors())
app.use('/images', express.static('images'))
// Despues del build, sustituir la linea anterior por : app.use(express.static('//La ruta de la carpeta build'))



// PAGINA PRINCIAL
app.get('/', (request, response) => {
  response.send('<h1>Página principal backend</h1>')
})

// API INICIO
app.get('/api', (request, response) => {
  response.send('<h1>API backend</h1>')
})


// SERIES
app.use('/api/series', seriesRouter)


// OBRAS
app.use('/api/obras', obrasRouter)


// AUTOR
app.use('/api/autor', autorRouter)


// ARTICULOS
app.use('/api/articulos', articulosRouter)


// EVENTOS
app.use('/api/eventos', eventosRouter)


// CRITICAS
app.use('/api/criticas', criticasRouter)


// USUARIOS
app.use('/api/usuarios', usuariosRouter)


// LOGIN
app.use('/api/login', loginRouter)

// En el caso de no encontrar la url indicada
app.use(notFound)

// Manejo de errores
app.use(handlerErrors)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
