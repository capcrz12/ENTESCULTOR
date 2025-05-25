const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.api.resources({ max_results: 1 }, function (error, result) {
  if (error) return console.error("Error:", error);
  console.log("Cloudinary OK:", result);
});

const removeFileExtension = (filename) => {
  return filename.replace(/\.[^/.]+$/, "");
};

const storageObras = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "obras",
      format: "jpg", // Puedes cambiar el formato si es necesario
      public_id: removeFileExtension(file.originalname.replace(/ /g, "_")),
    };
  },
});

const storageSeries = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "series",
      format: "jpg", // Puedes cambiar el formato si es necesario
      public_id: removeFileExtension(file.originalname.replace(/ /g, "_")),
    };
  },
});

const storageArticulos = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "articulos",
      format: "jpg", // Puedes cambiar el formato si es necesario
      public_id: removeFileExtension(file.originalname.replace(/ /g, "_")),
    };
  },
});

const storageEventos = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "eventos",
      format: "jpg", // Puedes cambiar el formato si es necesario
      public_id: removeFileExtension(file.originalname.replace(/ /g, "_")),
    };
  },
});

const storageAutor = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "autor",
      format: "jpg", // Puedes cambiar el formato si es necesario
      public_id: removeFileExtension(file.originalname.replace(/ /g, "_")),
    };
  },
});

const storageFondos = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "fondos",
      format: "jpg", // Puedes cambiar el formato si es necesario
      public_id: removeFileExtension(file.originalname.replace(/ /g, "_")),
    };
  },
});

const storageCriticas = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "criticas",
      format: "jpg", // Puedes cambiar el formato si es necesario
      public_id: removeFileExtension(file.originalname.replace(/ /g, "_")),
    };
  },
});

const storageIcon = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "icon",
      format: "jpg", // Puedes cambiar el formato si es necesario
      public_id: removeFileExtension(file.originalname.replace(/ /g, "_")),
    };
  },
});

const uploadObras = multer({
  storage: storageObras,
  limits: { fileSize: 50 * 1024 * 1024 },
});
const uploadSeries = multer({
  storage: storageSeries,
  limits: { fileSize: 50 * 1024 * 1024 },
});
const uploadArticulos = multer({
  storage: storageArticulos,
  limits: { fileSize: 50 * 1024 * 1024 },
});
const uploadEventos = multer({
  storage: storageEventos,
  limits: { fileSize: 50 * 1024 * 1024 },
});
const uploadAutor = multer({
  storage: storageAutor,
  limits: { fileSize: 50 * 1024 * 1024 },
});
const uploadFondos = multer({
  storage: storageFondos,
  limits: { fileSize: 50 * 1024 * 1024 },
});
const uploadCriticas = multer({
  storage: storageCriticas,
  limits: { fileSize: 50 * 1024 * 1024 },
});
const uploadIcon = multer({
  storage: storageIcon,
  limits: { fileSize: 50 * 1024 * 1024 },
});

module.exports = {
  cloudinary,
  uploadObras,
  uploadSeries,
  uploadArticulos,
  uploadEventos,
  uploadAutor,
  uploadFondos,
  uploadCriticas,
  uploadIcon,
};
