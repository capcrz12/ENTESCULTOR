const autorRouter = require('express').Router()
const Autor = require('../models/Autor')
const userExtractor = require('../middlewares/userExtractor')
const multer = require('multer')
const deleteImage = require('./deleteImage')


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images/autor')
  },
  filename : (req, file, cb) => {
    cb(null, file.originalname.replace(/ /g, "_"))
  }
})

const upload = multer({ storage })

autorRouter.get('/', async (request, response, next) => {
  try {
    const autor = await Autor.find({})
    response.json(autor)
  } catch(err) { next(err)}
})

autorRouter.put('/image', userExtractor, upload.single('image'), async (request, response, next) => {
  try {
    const autor = await Autor.find({})
    const id = autor[0].id

    const url = `.${autor[0].image}`

    deleteImage(url)

    const newAutor = {
      image: `/images/autor/${request.file.originalname.replace(/ /g, "_")}`
    }

    const result = await Autor.findByIdAndUpdate(id, newAutor)
      
    response.json(result)
  } catch (err) { next(err)}
})

autorRouter.put('/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  const autor = request.body

  const newAutorInfo = {
    texto: autor.texto
  }

  try {
    const result = await Autor.findByIdAndUpdate(id, newAutorInfo, { new: true })
    response.json(result)
  } catch(err) { next(err)}
})

autorRouter.post('/', userExtractor, async (request, response, next) => {
  try {
    const {texto} = request.body

    const autor = await Autor.find()
    const id = autor[0].id

    const newAutor = {
      texto,
      image: ''
    }

    const result = await Autor.findByIdAndUpdate(id, newAutor)
      
    response.json(result)
  } catch (err) { next(err)}
})


module.exports = autorRouter