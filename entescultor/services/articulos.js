import axios from 'axios'
import { getToken } from './token'

let token = null

export const getAllArticulos = () => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articulos`, { cache: 'no-store' })
    .then(res => res.json())
}

export const createArticulo = ({ titulo, fecha, texto, image, url }) => {

  token = getToken()
  
  const config = {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data'
    }
  }

  axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/api/articulos`, { titulo, fecha, texto, image, url }, config)
    .then((response) => {
      const { data } = response
      return data
    })
}

export const putTitleArticulo = ({ title, id }) => {

  token = getToken()

  const config = {
    headers: {
      Authorization: token
    }
  }

  axios
    .put(`${process.env.NEXT_PUBLIC_API_URL}/api/articulos/title/${id}`, { title }, config)
    .then((response) => {
      const { data } = response
      return data
    })
}

export const putFechaArticulo = ({ fecha, id }) => {

  token = getToken()

  const config = {
    headers: {
      Authorization: token
    }
  }

  axios
    .put(`${process.env.NEXT_PUBLIC_API_URL}/api/articulos/fecha/${id}`, { fecha }, config)
    .then((response) => {
      const { data } = response
      return data
    })
}

export const putTextoArticulo = ({ texto, id }) => {

  token = getToken()

  const config = {
    headers: {
      Authorization: token
    }
  }

  axios
    .put(`${process.env.NEXT_PUBLIC_API_URL}/api/articulos/texto/${id}`, { texto }, config)
    .then((response) => {
      const { data } = response
      return data
    })
}

export const putUrlArticulo = ({ url, id }) => {

  token = getToken()

  const config = {
    headers: {
      Authorization: token
    }
  }

  axios
    .put(`${process.env.NEXT_PUBLIC_API_URL}/api/articulos/url/${id}`, { url }, config)
    .then((response) => {
      const { data } = response
      return data
    })
}

export const putImageArticulo = ({ image, id }) => {

  token = getToken()

  const config = {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data'
    }
  }

  axios
    .put(`${process.env.NEXT_PUBLIC_API_URL}/api/articulos/image/${id}`, { image }, config)
    .then((response) => {
      const { data } = response
      return data
    })
}

export const deleteArticulo = ({ id }) => {

  token = getToken()

  const config = {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data'
    }
  }

  axios
    .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/articulos/${id}`, config)
    .then((response) => {
      const { data } = response
      return data
    })
}
