const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const storageObras = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'obras',
      format: 'jpg', // Puedes cambiar el formato si es necesario
      public_id: file.originalname.replace(/ /g, '_')
    }
  }
})

const storageSeries = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'series',
      format: 'jpg', // Puedes cambiar el formato si es necesario
      public_id: file.originalname.replace(/ /g, '_')
    }
  }
})

const storageArticulos = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'articulos',
      format: 'jpg', // Puedes cambiar el formato si es necesario
      public_id: file.originalname.replace(/ /g, '_')
    }
  }
})

const storageEventos = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'eventos',
      format: 'jpg', // Puedes cambiar el formato si es necesario
      public_id: file.originalname.replace(/ /g, '_')
    }
  }
})

const storageAutor = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'autor',
      format: 'jpg', // Puedes cambiar el formato si es necesario
      public_id: file.originalname.replace(/ /g, '_')
    }
  }
})

const storageFondos = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'fondos',
      format: 'jpg', // Puedes cambiar el formato si es necesario
      public_id: file.originalname.replace(/ /g, '_')
    }
  }
})

const storageCriticas = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'criticas',
      format: 'jpg', // Puedes cambiar el formato si es necesario
      public_id: file.originalname.replace(/ /g, '_')
    }
  }
})

const storageIcon = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'icon',
      format: 'jpg', // Puedes cambiar el formato si es necesario
      public_id: file.originalname.replace(/ /g, '_')
    }
  }
})


const uploadObras = multer({ storage: storageObras })
const uploadSeries = multer({ storage: storageSeries })
const uploadArticulos = multer({ storage: storageArticulos })
const uploadEventos = multer({ storage: storageEventos })
const uploadAutor = multer({ storage: storageAutor })
const uploadFondos = multer({ storage: storageFondos })
const uploadCriticas = multer({ storage: storageCriticas })
const uploadIcon = multer({ storage: storageIcon })

module.exports = { cloudinary, uploadObras , uploadSeries, uploadArticulos, uploadEventos, uploadAutor, uploadFondos, uploadCriticas, uploadIcon }
