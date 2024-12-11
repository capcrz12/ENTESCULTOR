const eventosRouter = require('express').Router()
const Evento = require('../models/Evento')
const userExtractor = require('../middlewares/userExtractor')
// const multer = require('multer')
const deleteImage = require('./deleteImage')
const { uploadEventos } = require('../cloudinaryConfig')



// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './images/eventos')
//   },
//   filename : (req, file, cb) => {
//     cb(null, file.originalname.replace(/ /g, '_'))
//   }
// })

// const upload = multer({ storage })

eventosRouter.get('/', async (request, response, next) => {
  try {
    const eventos = await Evento.find({})
    response.json(eventos)
  } catch (err) { next(err)}
})

eventosRouter.get('/:id', async (request, response, next) => {
  const { id } = request.params
  
  try {
    const evento = await Evento.findById(id)
    evento
      ? response.json(evento)
      : response.status(404).end()
  } catch(err) { next(err)}
})

eventosRouter.put('/title/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  const eventos = request.body

  const newEventosInfo = {
    title: eventos.title
  }

  try {
    const result = await Evento.findByIdAndUpdate(id, newEventosInfo, { new: true })
    response.json(result)
  } catch(err) { next(err)}
})

eventosRouter.put('/fecha/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  const evento = request.body

  const newEventoRouter = {
    fecha: evento.fecha
  }

  try {
    const result = await Evento.findByIdAndUpdate(id, newEventoRouter, { new: true })
    response.json(result)
  } catch(err) { next(err)}
})

eventosRouter.put('/nota/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  const evento = request.body

  const newEventoRouter = {
    nota: evento.nota
  }

  try {
    const result = await Evento.findByIdAndUpdate(id, newEventoRouter, { new: true })
    response.json(result)
  } catch(err) { next(err)}
})

eventosRouter.put('/enlace/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  const evento = request.body

  const newEventoEnlace = {
    enlace: evento.enlace
  }

  try {
    const result = await Evento.findByIdAndUpdate(id, newEventoEnlace, { new: true })
    response.json(result)
  } catch(err) { next(err)}
})

eventosRouter.put('/url/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  const evento = request.body

  const newEventoRouter = {
    url: evento.url
  }

  try {
    const result = await Evento.findByIdAndUpdate(id, newEventoRouter, { new: true })
    response.json(result)
  } catch(err) { next(err)}
})

eventosRouter.put('/deleteImage/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  const cuerpo = request.body

  const eventoActual = await Evento.findById(id)

  let masEventos = await Evento.find({images : { $all: [cuerpo.image] }})

  // Si masEventos solo contiene un evento es porque solo se ha encontrado el evento
  // que queremos borrar, y por tanto la imagen no se usa en otros eventos
  if (masEventos.length === 1) {
    deleteImage(`.${cuerpo.image}`)
  }

  let imagenes = eventoActual.images

  imagenes = imagenes.filter((imagen) => imagen !== cuerpo.image)

  const newEventoInfo = {
    images: imagenes,
  }

  try {
    const result = await Evento.findByIdAndUpdate(id, newEventoInfo, { new: true })

    response.json(result)
  } catch(err) { next(err)}
})

eventosRouter.put('/uploadImage/:id', userExtractor, uploadEventos.single('image'), async (request, response, next) => {
  const { id } = request.params

  const eventoActual = await Evento.findById(id)

  let imagenes = eventoActual.images

  imagenes.push(`${request.file.path}`)

  const newEventoInfo = {
    images: imagenes
  }

  try {
    const result = await Evento.findByIdAndUpdate(id, newEventoInfo, { new: true })

    response.json(result)
  } catch(err) { next(err)}
})

eventosRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params

  let evento = await Evento.findById(id)

  for (let i = 0; i<evento.images.length; i++) {
    const url = `.${evento.images[i]}`

    let masEventos = await Evento.find({images : { $all: [evento.images[i]] }})

    // Si masEventos solo contiene un evento es porque solo se ha encontrado el evento
    // que queremos borrar, y por tanto la imagen no se usa en otros eventos
    if (masEventos.length === 1) {
      deleteImage(url)
    }
  }

  try {
    await Evento.findByIdAndDelete(id)
    response.status(204).end()
  } catch (err) { next(err)}
})

eventosRouter.post('/', userExtractor, uploadEventos.array('images[]'), async (request, response, next) => {
  try {
    const evento = request.body

    const numImages = request.files.length

    let urlImages = []

    for (let i = 0; i < numImages; i++) {
      urlImages.push(`${request.files[i].path}`)
    }

    const newEvento = new Evento({
      title: evento.title,
      fecha: evento.fecha,
      nota: evento.nota,
      url: evento.url,
      images: urlImages,
      enlace: evento.enlace
    })

    const savedEvento = await newEvento.save()
    response.json(savedEvento)
  } catch (err) { next(err)}
})

module.exports = eventosRouter