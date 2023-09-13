import axios from 'axios'
import { getToken } from './token'

let token = null

export const getAllEventos = () => {
  return fetch('http://localhost:3001/api/eventos')
    .then(res => res.json())
}

export const createEvento = ({ title, fecha, nota, url }) => {

  token = getToken()
  
  const config = {
    headers: {
      Authorization: token,
    }
  }

  axios
    .post('http://localhost:3001/api/eventos', { title, fecha, nota, url }, config)
    .then((response) => {
      const { data } = response
      return data
    })
}

export const putTitleEvento = ({ title, id }) => {

  token = getToken()

  const config = {
    headers: {
      Authorization: token
    }
  }

  axios
    .put(`http://localhost:3001/api/eventos/title/${id}`, { title }, config)
    .then((response) => {
      const { data } = response
      return data
    })
}

export const putFechaEvento = ({ fecha, id }) => {

  token = getToken()

  const config = {
    headers: {
      Authorization: token
    }
  }

  axios
    .put(`http://localhost:3001/api/eventos/fecha/${id}`, { fecha }, config)
    .then((response) => {
      const { data } = response
      return data
    })
}

export const putNotaEvento = ({ nota, id }) => {

  token = getToken()

  const config = {
    headers: {
      Authorization: token
    }
  }

  axios
    .put(`http://localhost:3001/api/eventos/nota/${id}`, { nota }, config)
    .then((response) => {
      const { data } = response
      return data
    })
}

export const putUrlEvento = ({ url, id }) => {

  token = getToken()

  const config = {
    headers: {
      Authorization: token
    }
  }

  axios
    .put(`http://localhost:3001/api/eventos/url/${id}`, { url }, config)
    .then((response) => {
      const { data } = response
      return data
    })
}

export const deleteEvento = ({ id }) => {

  token = getToken()

  const config = {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data'
    }
  }

  axios
    .delete(`http://localhost:3001/api/eventos/${id}`, config)
    .then((response) => {
      const { data } = response
      return data
    })
}