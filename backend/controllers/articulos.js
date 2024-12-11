const articulosRouter = require('express').Router()
const Articulo = require('../models/Articulo')
const userExtractor = require('../middlewares/userExtractor')
// const multer = require('multer')
const deleteImage = require('./deleteImage')
const { uploadArticulos } = require('../cloudinaryConfig')


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './images/articulos')
//   },
//   filename : (req, file, cb) => {
//     cb(null, file.originalname.replace(/ /g, '_'))
//   }
// })

// const upload = multer({ storage })

articulosRouter.get('/', async (request, response, next) => {
  try {
    const articulos = await Articulo.find({})
    response.json(articulos)
  } catch(err) { next(err)}
})

articulosRouter.get('/:id', async (request, response, next) => {
  const { id } = request.params
  
  try {
    const articulo = Articulo.findById(id)
    articulo
      ? response.json(articulo)
      : response.status(404).end()
  } catch(err) { next(err)}
})

articulosRouter.put('/title/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  const articulo = request.body

  const newArticuloInfo = {
    title: articulo.title
  }

  try {
    const result = await Articulo.findByIdAndUpdate(id, newArticuloInfo, { new: true })
    response.json(result)
  } catch(err) { next(err)}
})

articulosRouter.put('/fecha/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  const articulo = request.body

  const newArticuloInfo = {
    fecha: articulo.fecha
  }

  try {
    const result = await Articulo.findByIdAndUpdate(id, newArticuloInfo, { new: true })
    response.json(result)
  } catch(err) { next(err)}
})

articulosRouter.put('/texto/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  const articulo = request.body

  const newArticuloInfo = {
    texto: articulo.texto
  }

  try {
    const result = await Articulo.findByIdAndUpdate(id, newArticuloInfo, { new: true })
    response.json(result)
  } catch(err) { next(err)}
})

articulosRouter.put('/url/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  const articulo = request.body

  const newArticuloInfo = {
    url: articulo.url
  }

  try {
    const result = await Articulo.findByIdAndUpdate(id, newArticuloInfo, { new: true })
    response.json(result)
  } catch(err) { next(err)}
})

articulosRouter.put('/image/:id', userExtractor, uploadArticulos.single('image'), async (request, response, next) => {
  const { id } = request.params

  const articuloActual = await Articulo.findById(id)

  deleteImage(`.${articuloActual.image}`)

  const newArticuloInfo = {
    image: `${request.file.path}`,
  }

  try {
    const result = await Articulo.findByIdAndUpdate(id, newArticuloInfo, { new: true })
    response.json(result)
  } catch(err) { next(err)}
})

articulosRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params

  let articulo = await Articulo.findById(id)

  const url = `.${articulo.image}`

  try {
    if (url !== '.'){
      deleteImage(url)
    }
    await Articulo.findByIdAndDelete(id)
    response.status(204).end()
  } catch(err) { next(err)}
})

articulosRouter.post('/', userExtractor, uploadArticulos.single('image'), async (request, response, next) => {
  try {
    const articulo = request.body

    let url = ''
    if (request.file !== null & request.file !== undefined) {
      url = `${request.file.path}`
    }

    const newArticulo = new Articulo({
      title: articulo.titulo,
      fecha: articulo.fecha,
      texto: articulo.texto,
      image: url,
      url: articulo.url
    })

    const savedArticulo = await newArticulo.save()
    response.json(savedArticulo)
    
  } catch (err) { next(err)}
})

module.exports = articulosRouter