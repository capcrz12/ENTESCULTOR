import axios from 'axios'
import { getToken } from './token'

let token = null

export const getAllObras = () => {
  return fetch('http://localhost:3001/api/obras')
    .then(res => res.json())
}

export const getObrasBySerie = (name) => {
  return fetch(`http://localhost:3001/api/obras/${name}`)
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
    .post('http://localhost:3001/api/obras', { title, images, material, largo, ancho, alto, serieId }, config)
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
    .put(`http://localhost:3001/api/obras/title/${id}`, { title }, config)
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
    .put(`http://localhost:3001/api/obras/alto/${id}`, { alto }, config)
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
    .put(`http://localhost:3001/api/obras/ancho/${id}`, { ancho }, config)
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
    .put(`http://localhost:3001/api/obras/largo/${id}`, { largo }, config)
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
    .put(`http://localhost:3001/api/obras/material/${id}`, { material }, config)
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
    .put(`http://localhost:3001/api/obras/serieId/${id}`, { serieId }, config)
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
    .put(`http://localhost:3001/api/obras/deleteImage/${id}`, { image }, config)
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
    .put(`http://localhost:3001/api/obras/uploadImage/${id}`, { image }, config)
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
    .delete(`http://localhost:3001/api/obras/${id}`, config)
    .then((response) => {
      const { data } = response
      return data
    })
}


