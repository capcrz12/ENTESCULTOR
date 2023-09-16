const criticasRouter = require('express').Router()
const Critica = require('../models/Critica')
const userExtractor = require('../middlewares/userExtractor')
const multer = require('multer')
const deleteImage = require('./deleteImage')



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images/criticas')
  },
  filename : (req, file, cb) => {
    cb(null, file.originalname.replace(/ /g, '_'))
  }
})

const upload = multer({ storage })

criticasRouter.get('/', async (request, response, next) => {
  try {
    const criticas = await Critica.find({})
    response.json(criticas)
  } catch (err) { next(err)}
})

criticasRouter.get('/:id', async (request, response, next) => {
  const { id } = request.params
  
  try {
    const critica = await Critica.findById(id)
    critica
      ? response.json(critica)
      : response.status(404).end()
  } catch(err) { next(err)}
})

criticasRouter.put('/autor/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  const critica = request.body

  const newCriticaInfo = {
    autor: critica.autor
  }

  try {
    const result = await Critica.findByIdAndUpdate(id, newCriticaInfo, { new: true })
    response.json(result)
  } catch (err) { next(err)}
})

criticasRouter.put('/fecha/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  const critica = request.body

  const newCriticaInfo = {
    fecha: critica.fecha
  }

  try {
    const result = await Critica.findByIdAndUpdate(id, newCriticaInfo, { new: true })
    response.json(result)
  } catch (err) { next(err)}
})

criticasRouter.put('/texto/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  const critica = request.body

  const newCriticaInfo = {
    texto: critica.texto
  }

  try {
    const result = await Critica.findByIdAndUpdate(id, newCriticaInfo, { new: true })
    response.json(result)
  } catch (err) { next(err)}
})

criticasRouter.put('/deleteImage/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  const cuerpo = request.body

  const criticaActual = await Critica.findById(id)

  let masCriticas = await Critica.find({images : { $all: [cuerpo.image] }})

  // Si masCriticas solo contiene una critica es porque solo se ha encontrado la critica
  // que queremos borrar, y por tanto la imagen no se usa en otras critica
  if (masCriticas.length === 1) {
    deleteImage(`.${cuerpo.image}`)
  }

  let imagenes = criticaActual.images

  imagenes = imagenes.filter((imagen) => imagen !== cuerpo.image)

  const newCriticaInfo = {
    images: imagenes,
  }

  try {
    const result = await Critica.findByIdAndUpdate(id, newCriticaInfo, { new: true })

    response.json(result)
  } catch(err) { next(err)}
})

criticasRouter.put('/uploadImage/:id', userExtractor, upload.single('image'), async (request, response, next) => {
  const { id } = request.params

  const criticaActual = await Critica.findById(id)

  let imagenes = criticaActual.images

  imagenes.push(`/images/criticas/${request.file.originalname.replace(/ /g, '_')}`)

  const newCriticaInfo = {
    images: imagenes
  }

  try {
    const result = await Critica.findByIdAndUpdate(id, newCriticaInfo, { new: true })

    response.json(result)
  } catch(err) { next(err)}
})

criticasRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params

  let critica = await Critica.findById(id)

  for (let i = 0; i < critica.images.length; i++) {
    const url = `.${critica.images[i]}`

    let masCriticas = await Critica.find({images : { $all: [critica.images[i]] }})

    // Si masCriticas solo contiene una critica es porque solo se ha encontrado la critica
    // que queremos borrar, y por tanto la imagen no se usa en otras criticas
    if (masCriticas.length === 1) {
      deleteImage(url)
    }
  }

  try {
    await Critica.findByIdAndDelete(id)
    response.status(204).end()
  } catch (err) { next(err)}
})

criticasRouter.post('/', userExtractor, upload.array('images[]'), async (request, response, next) => {
  try {
    const critica = request.body

    const numImages = request.files.length

    let urlImages = []

    for (let i = 0; i < numImages; i++) {
      urlImages.push(`/images/criticas/${request.files[i].originalname.replace(/ /g, '_')}`)
    }

    const newCritica = new Critica({
      autor: critica.autor,
      fecha: critica.fecha,
      texto: critica.texto,
      images: urlImages
    })

    const savedCritica = await newCritica.save()
    response.json(savedCritica)
  } catch (err) { next(err)}
})

module.exports = criticasRouter