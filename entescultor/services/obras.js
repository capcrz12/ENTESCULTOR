import axios from 'axios'
import { getToken } from './token'

let token = null

export const getAllObras = () => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/obras`)
    .then(res => res.json())
}

export const getObrasBySerie = (name) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/obras/${name}`)
    .then(res => res.json())
}

export const createObra = ({ title, images, material, largo, ancho, alto, serieId }) => {

  token = getToken()
  
  const config = {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data'
    }
  }

  axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/api/obras`, { title, images, material, largo, ancho, alto, serieId }, config)
    .then((response) => {
      const { data } = response
      return data
    })
}

export const putTitleObra = ({ title, id }) => {

  token = getToken()

  const config = {
    headers: {
      Authorization: token
    }
  }

  axios
    .put(`${process.env.NEXT_PUBLIC_API_URL}/api/obras/title/${id}`, { title }, config)
    .then((response) => {
      const { data } = response
      return data
    })
}

export const putAltoObra = ({ alto, id }) => {

  token = getToken()

  const config = {
    headers: {
      Authorization: token
    }
  }

  axios
    .put(`${process.env.NEXT_PUBLIC_API_URL}/api/obras/alto/${id}`, { alto }, config)
    .then((response) => {
      const { data } = response
      return data
    })
}

export const putAnchoObra = ({ ancho, id }) => {

  token = getToken()

  const config = {
    headers: {
      Authorization: token
    }
  }

  axios
    .put(`${process.env.NEXT_PUBLIC_API_URL}/api/obras/ancho/${id}`, { ancho }, config)
    .then((response) => {
      const { data } = response
      return data
    })
}

export const putLargoObra = ({ largo, id }) => {

  token = getToken()

  const config = {
    headers: {
      Authorization: token
    }
  }

  axios
    .put(`${process.env.NEXT_PUBLIC_API_URL}/api/obras/largo/${id}`, { largo }, config)
    .then((response) => {
      const { data } = response
      return data
    })
}

export const putMaterialObra = ({ material, id }) => {

  token = getToken()

  const config = {
    headers: {
      Authorization: token
    }
  }

  axios
    .put(`${process.env.NEXT_PUBLIC_API_URL}/api/obras/material/${id}`, { material }, config)
    .then((response) => {
      const { data } = response
      return data
    })
}

export const putSerieObra = ({ serieId, id }) => {

  token = getToken()

  const config = {
    headers: {
      Authorization: token
    }
  }

  axios
    .put(`${process.env.NEXT_PUBLIC_API_URL}/api/obras/serieId/${id}`, { serieId }, config)
    .then((response) => {
      const { data } = response
      return data
    })
}

export const deleteImageObra = ({ image, id }) => {

  token = getToken()

  const config = {
    headers: {
      Authorization: token,
    }
  }

  axios
    .put(`${process.env.NEXT_PUBLIC_API_URL}/api/obras/deleteImage/${id}`, { image }, config)
    .then((response) => {
      const { data } = response
      return data
    })
}

export const uploadImageObra = ({ image, id }) => {

  token = getToken()

  const config = {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data'
    }
  }

  axios
    .put(`${process.env.NEXT_PUBLIC_API_URL}/api/obras/uploadImage/${id}`, { image }, config)
    .then((response) => {
      const { data } = response
      return data
    })
}

export const deleteObra = ({ id }) => {

  token = getToken()

  const config = {
    headers: {
      Authorization: token
    }
  }

  axios
    .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/obras/${id}`, config)
    .then((response) => {
      const { data } = response
      return data
    })
}


