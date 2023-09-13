import axios from 'axios'
import { getToken } from './token'

let token = null

export const getAllCriticas = () => {
  return fetch('http://localhost:3001/api/criticas')
    .then(res => res.json())
}

export const createCritica = ({ autor, fecha, texto }) => {

  token = getToken()
  
  const config = {
    headers: {
      Authorization: token,
    }
  }

  axios
    .post('http://localhost:3001/api/criticas', { autor, fecha, texto }, config)
    .then((response) => {
      const { data } = response
      return data
    })
}

export const putAutorCritica = ({ autor, id }) => {

  token = getToken()

  const config = {
    headers: {
      Authorization: token
    }
  }

  axios
    .put(`http://localhost:3001/api/criticas/autor/${id}`, { autor }, config)
    .then((response) => {
      const { data } = response
      return data
    })
}

export const putFechaCritica = ({ fecha, id }) => {

  token = getToken()

  const config = {
    headers: {
      Authorization: token
    }
  }

  axios
    .put(`http://localhost:3001/api/criticas/fecha/${id}`, { fecha }, config)
    .then((response) => {
      const { data } = response
      return data
    })
}

export const putTextoCritica = ({ texto, id }) => {

  token = getToken()

  const config = {
    headers: {
      Authorization: token
    }
  }

  axios
    .put(`http://localhost:3001/api/criticas/texto/${id}`, { texto }, config)
    .then((response) => {
      const { data } = response
      return data
    })
}

export const deleteCritica = ({ id }) => {

  token = getToken()

  const config = {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data'
    }
  }

  axios
    .delete(`http://localhost:3001/api/criticas/${id}`, config)
    .then((response) => {
      const { data } = response
      return data
    })
}
