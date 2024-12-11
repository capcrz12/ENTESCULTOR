const obrasRouter = require('express').Router()
const Obra = require('../models/Obra')
const Serie = require('../models/Serie')
const userExtractor = require('../middlewares/userExtractor')
// const multer = require('multer')
const { uploadObras } = require('../cloudinaryConfig')
const deleteImage = require('./deleteImage')

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './images/obras')
//   },
//   filename : (req, file, cb) => {
//     cb(null, file.originalname.replace(/ /g, '_'))
//   }
// })

// const upload = multer({ storage })

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

obrasRouter.put('/deleteImage/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  const cuerpo = request.body

  const obraActual = await Obra.findById(id)

  const serie = await Serie.findOne({image: cuerpo.image})

  let masObras = await Obra.find({images : { $all: [cuerpo.image] }})

  // Si masObras solo contiene una obra es porque solo se ha encontrado la obra
  // que queremos borrar, y por tanto la imagen no se usa en otras obras
  if (masObras.length === 1) {
    deleteImage(`.${cuerpo.image}`)
  }

  let imagenes = obraActual.images

  imagenes = imagenes.filter((imagen) => imagen !== cuerpo.image)

  const newObraInfo = {
    images: imagenes,
  }

  try {
    const result = await Obra.findByIdAndUpdate(id, newObraInfo, { new: true })

    // Si la miniatura de la serie es la de la obra borrada, 
    // se sustituye por la primera encontrada en la coleccion de obras
    // de esa serie 
    if (serie !== null) {
      serie.image = imagenes[0]
      await serie.save()
    }

    response.json(result)
  } catch(err) { next(err)}
})

obrasRouter.put('/uploadImage/:id', userExtractor, uploadObras.single('image'), async (request, response, next) => {
  const { id } = request.params

  const obraActual = await Obra.findById(id)

  let imagenes = obraActual.images

  imagenes.push(`${request.file.path}`)

  const newObraInfo = {
    images: imagenes
  }

  try {
    const result = await Obra.findByIdAndUpdate(id, newObraInfo, { new: true })

    response.json(result)
  } catch(err) { next(err)}
})

obrasRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  
  let obra = await Obra.findById(id)

  for (let i = 0; i<obra.images.length; i++) {
    const serie = await Serie.findOne({image: obra.images[i]})

    const url = `.${obra.images[i]}`

    let masObras = await Obra.find({images : { $all: [obra.images[i]] }})

    // Si masObras solo contiene una obra es porque solo se ha encontrado la obra
    // que queremos borrar, y por tanto la imagen no se usa en otras obras
    if (masObras.length === 1) {
      deleteImage(url)
    }

    try {
      // Si la miniatura de la serie es la de la obra borrada, 
      // se sustituye por la primera encontrada en la coleccion de obras
      // de esa serie 
      if (serie !== null) {
        obra = await Obra.findOne({serieId: serie.id})
        serie.image = obra.images[0]
        await serie.save()
      }
    } catch(err) { next(err)}
  }  

  try {
    await Obra.findByIdAndDelete(id)

    response.status(204).end()
  } catch(err) { next(err)}
})

obrasRouter.post('/', userExtractor, uploadObras.array('images[]'), async (request, response, next) => {
  try {
    const {
      title, 
      material, 
      largo,
      ancho,
      alto, 
      serieId
    } = request.body

    const numImages = request.files.length

    let urlImages = []

    for (let i = 0; i < numImages; i++) {
      urlImages.push(`${request.files[i].path}`)
    }

    // Buscamos la serie a la que pertenece
    const serie = await Serie.findById(serieId)

    const newObra = new Obra({
      title,
      images: urlImages,
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