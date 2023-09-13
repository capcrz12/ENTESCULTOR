const criticasRouter = require('express').Router()
const Critica = require('../models/Critica')
const userExtractor = require('../middlewares/userExtractor')


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

criticasRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params

  try {
    await Critica.findByIdAndDelete(id)
    response.status(204).end()
  } catch (err) { next(err)}
})

criticasRouter.post('/', userExtractor, async (request, response, next) => {
  try {
    const critica = request.body

    const newCritica = new Critica({
      autor: critica.autor,
      fecha: critica.fecha,
      texto: critica.texto
    })

    const savedCritica = await newCritica.save()
    response.json(savedCritica)
  } catch (err) { next(err)}
})

module.exports = criticasRouter