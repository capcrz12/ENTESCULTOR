const obrasRouter = require('express').Router()
const Obra = require('../models/Obra')
const Serie = require('../models/Serie')
const userExtractor = require('../middlewares/userExtractor')
const multer = require('multer')
const deleteImage = require('./deleteImage')
const renameImage = require('./renameImage')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images/obras')
  },
  filename : (req, file, cb) => {
    cb(null, file.originalname.replace(/ /g, "_"))
  }
})

const upload = multer({ storage })

obrasRouter.get('/', async (request, response, next) => {
  try {
    const obras = await Obra.find({}).populate('serieId', {   // Populate == JOIN en SQL 
      name: 1,                                                //(muestra la informacion del array obras)
      image: 1                                                // Con : 1 decimos que queremos que se muestre
    })  
    response.json(obras)
  } catch(err) { next(err)}
})

obrasRouter.get('/:serie', async (request, response, next) => {
  const { serie } = request.params
  
  const serieId = await Serie.find({name: serie})

  const obra = await Obra.find({serieId: serieId}).populate('serieId', {   // Populate == JOIN en SQL 
    name: 1,                                                //(muestra la informacion del array obras)
    image: 1                                                // Con : 1 decimos que queremos que se muestre
  })  
  try {
    obra
      ? response.json(obra)
      : response.status(404).end()
  } catch(err) { next(err)}
})

obrasRouter.get('/:id', async (request, response, next) => {
  try {
    const { id } = request.params
    
    const obra = await Obra.findById(id)
    
    obra
      ? response.json(obra)
      : response.status(404).end()
  } catch(err) { next(err)}
})

obrasRouter.put('/title/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  const obra = request.body

  const newObraInfo = {
    title: obra.title
  }

  try {
    const result = await Obra.findByIdAndUpdate(id, newObraInfo, { new: true })
    response.json(result)
  } catch(err) { next(err)}
})

obrasRouter.put('/alto/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  const obra = request.body

  const newObraInfo = {
    alto: obra.alto
  }

  try {
    const result = await Obra.findByIdAndUpdate(id, newObraInfo, { new: true })
    response.json(result)
  } catch(err) { next(err)}
})

obrasRouter.put('/ancho/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  const obra = request.body

  const newObraInfo = {
    ancho: obra.ancho
  }

  try {
    const result = await Obra.findByIdAndUpdate(id, newObraInfo, { new: true })
    response.json(result)
  } catch(err) { next(err)}
})

obrasRouter.put('/largo/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  const obra = request.body

  const newObraInfo = {
    largo: obra.largo
  }

  try {
    const result = await Obra.findByIdAndUpdate(id, newObraInfo, { new: true })
    response.json(result)
  } catch(err) { next(err)}
})

obrasRouter.put('/material/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  const obra = request.body

  const newObraInfo = {
    material: obra.material
  }

  try {
    const result = await Obra.findByIdAndUpdate(id, newObraInfo, { new: true })
    response.json(result)
  } catch(err) { next(err)}
})

obrasRouter.put('/serieId/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  const obra = request.body

  const newObraInfo = {
    serieId: obra.serieId
  }

  // Buscamos la serie a la que pertenece
  const serie = await Serie.findById(obra.serieId)

  try {
    const result = await Obra.findByIdAndUpdate(id, newObraInfo, { new: true })

    // Actualizamos el array de obras de la serie
    serie.obras = serie.obras.concat(result._id)
    await serie.save()

    response.json(result)
  } catch(err) { next(err)}
})

obrasRouter.put('/image/:id', userExtractor, upload.single('image'), async (request, response, next) => {
  const { id } = request.params
  const cuerpo = request.body

  const obraActual = await Obra.findById(id)

  const serie = await Serie.findOne({image: obraActual.url})

  deleteImage(`.${obraActual.url}`)

  const newObraInfo = {
    url: `/images/obras/${request.file.originalname.replace(/ /g, "_")}`,
  }

  try {
    const result = await Obra.findByIdAndUpdate(id, newObraInfo, { new: true })

    // Si la miniatura de la serie es la de la obra borrada, 
    // se sustituye por la primera encontrada en la coleccion de obras
    // de esa serie 
    if (serie !== null) {
      serie.image = `/images/obras/${request.file.originalname.replace(/ /g, "_")}`
      await serie.save()
    }

    response.json(result)
  } catch(err) { next(err)}
})

obrasRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  
  let obra = await Obra.findById(id)

  const serie = await Serie.findOne({image: obra.url})

  const url = `.${obra.url}`

  try {
    deleteImage(url)
    await Obra.findByIdAndDelete(id)

    // Si la miniatura de la serie es la de la obra borrada, 
    // se sustituye por la primera encontrada en la coleccion de obras
    // de esa serie 
    if (serie !== null) {
      obra = await Obra.findOne({serieId: serie.id})
      serie.image = obra.url
      await serie.save()
    }

    response.status(204).end()
  } catch(err) { next(err)}
})

obrasRouter.post('/', userExtractor, upload.single('image'), async (request, response, next) => {
  try {
    const {
      title, 
      material, 
      largo,
      ancho,
      alto, 
      serieId
    } = request.body

    // Buscamos la serie a la que pertenece
    const serie = await Serie.findById(serieId)

    const newObra = new Obra({
      title,
      url: `/images/obras/${request.file.originalname.replace(/ /g, "_")}`,
      material,
      largo,
      ancho,
      alto,
      serieId: serie._id
    })

    const savedObra = await newObra.save()

    // Actualizamos el array de obras de la serie
    serie.obras = serie.obras.concat(savedObra._id)
    await serie.save()
      
    response.json(savedObra) 
  } catch (err) { next(err)}
})


module.exports = obrasRouter