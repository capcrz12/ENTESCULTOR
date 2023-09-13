const eventosRouter = require('express').Router()
const Evento = require('../models/Evento')
const userExtractor = require('../middlewares/userExtractor')

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

eventosRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params

  try {
    await Evento.findByIdAndDelete(id)
    response.status(204).end()
  } catch (err) { next(err)}
})

eventosRouter.post('/', userExtractor, async (request, response, next) => {
  try {
    const evento = request.body

    const newEvento = new Evento({
      title: evento.title,
      fecha: evento.fecha,
      nota: evento.nota,
      url: evento.url
    })

    const savedEvento = await newEvento.save()
    response.json(savedEvento)
  } catch (err) { next(err)}
})

module.exports = eventosRouter