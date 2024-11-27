import axios from 'axios'
import { getToken } from './token'

let token = null

export const getAllCriticas = () => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/criticas`)
    .then(res => res.json())
}

export const createCritica = ({ autor, fecha, texto, images }) => {

  token = getToken()
  
  const config = {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data'
    }
  }

  axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/criticas`, { autor, fecha, texto, images }, config)
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
    .put(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/criticas/autor/${id}`, { autor }, config)
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
    .put(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/criticas/fecha/${id}`, { fecha }, config)
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
    .put(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/criticas/texto/${id}`, { texto }, config)
    .then((response) => {
      const { data } = response
      return data
    })
}

export const deleteImageCritica = ({ image, id }) => {

  token = getToken()

  const config = {
    headers: {
      Authorization: token,
    }
  }

  axios
    .put(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/criticas/deleteImage/${id}`, { image }, config)
    .then((response) => {
      const { data } = response
      return data
    })
}

export const uploadImageCritica = ({ image, id }) => {

  token = getToken()

  const config = {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data'
    }
  }

  axios
    .put(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/criticas/uploadImage/${id}`, { image }, config)
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
    .delete(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/criticas/${id}`, config)
    .then((response) => {
      const { data } = response
      return data
    })
}
