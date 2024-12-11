// const { unlink } = require('fs/promises')
const { cloudinary } = require('../cloudinaryConfig')
module.exports = async (filePath) => {
  try {
    cloudinary.uploader.destroy(filePath)
    // await unlink(filePath)
    console.log(`${filePath} borrado`)
  } catch (error) {
    console.error(`Hubo un error intentando borrar el archivo: ${error.message}`)
  }
}