import axios from 'axios'
import { getToken } from './token'

let token = null

/*
export const setToken = newToken => {
  token = `Bearer ${newToken}`
}*/

export const createSerie = ({ name, image }) => {

  token = getToken()

  const config = {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data'
    }
  }

  axios
    .post('http://localhost:3001/api/series', { name, image }, config)
    .then((response) => {
      const { data } = response
      return data
    })
}

export const putTitleSerie = ({ name, id }) => {

  token = getToken()

  const config = {
    headers: {
      Authorization: token
    }
  }

  axios
    .put(`http://localhost:3001/api/series/title/${id}`, { name }, config)
    .then((response) => {
      const { data } = response
      return data
    })
}

export const putImageSerie = ({ image, id }) => {

  token = getToken()

  const config = {
    headers: {
      Authorization: token
    }
  }

  axios
    .put(`http://localhost:3001/api/series/image/${id}`, { image }, config)
    .then((response) => {
      const { data } = response
      return data
    })
}

export const getAllSeries = () => {
  return fetch('http://localhost:3001/api/series')
    .then(res => res.json())
}

export const deleteSerie = ({ id }) => {

  token = getToken()

  const config = {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data'
    }
  }

  axios
    .delete(`http://localhost:3001/api/series/${id}`, config)
    .then((response) => {
      const { data } = response
      return data
    })
}
