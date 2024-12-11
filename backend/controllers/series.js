const seriesRouter = require('express').Router()
const Serie = require('../models/Serie')
const userExtractor = require('../middlewares/userExtractor')
const { uploadSeries } = require('../cloudinaryConfig')
// const multer = require('multer')

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './images/series')
//   },
//   filename : (req, file, cb) => {
//     cb(null, file.originalname.replace(/ /g, '_'))
//   }
// })

// const upload = multer({ storage })

seriesRouter.get('/', async (request, response, next) => {
  try {
    const series = await Serie.find({}).populate('obras', {   // Populate == JOIN en SQL 
      title: 1,                                          //(muestra la informacion del array obras)
      images: 1,                                         // Con : 1 decimos que queremos que se muestre
      material: 1,                                       // Por defecto muestra todos los atributos
      largo: 1,                                          // En este caso no mostramos el propio id de serie 
      ancho: 1,                                          // (ya lo tenemos en serieId)
      alto: 1
    })   
    
    response.json(series)
  } catch(err) { next(err)}
})

seriesRouter.post('/', userExtractor, uploadSeries.single('image'), async (request, response, next) => {
  try {
    const serie = request.body

    const newSerie = new Serie({
      name: serie.name,
      image: `${request.file.path}`
    })

    const savedSerie = await newSerie.save()
    response.json(savedSerie)

  } catch(err) { next(err)}
})

seriesRouter.put('/title/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  const serie = request.body

  const newSerieInfo = {
    name: serie.name,
  }

  try {
    const result = await Serie.findByIdAndUpdate(id, newSerieInfo, { new: true })
    response.json(result)
  } catch(err) { next(err)}
})

seriesRouter.put('/image/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  const serie = request.body

  const newSerieInfo = {
    image: serie.image
  }

  try {
    const result = await Serie.findByIdAndUpdate(id, newSerieInfo, { new: true })
    response.json(result)
  } catch(err) { next(err)}
})

seriesRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params

  try {
    await Serie.findByIdAndDelete(id)
    response.status(204).end()
  } catch(err) { next(err)}
})



module.exports = seriesRouter