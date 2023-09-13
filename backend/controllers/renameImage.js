const { rename } = require('fs/promises')

module.exports = async (from, to) => {
  try {
    await rename(from, to)
    console.log(`Nombre: ${from} cambiado a: ${to}`)
  } catch (error) {
    console.error(`Hubo un error intentando cambiar el nombre del archivo: ${error.message}`)
  }
}