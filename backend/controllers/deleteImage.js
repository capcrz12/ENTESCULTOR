const { unlink } = require('fs/promises')

module.exports = async (filePath) => {
  try {
    await unlink(filePath)
    console.log(`${filePath} borrado`)
  } catch (error) {
    console.error(`Hubo un error intentando borrar el archivo: ${error.message}`)
  }
}