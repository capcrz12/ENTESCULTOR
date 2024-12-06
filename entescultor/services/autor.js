import axios from 'axios'
import { getToken } from './token'

let token = null

export const getAutor = () => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/autor`)
    .then(res => res.json())
}

export const createTextoAutor = ({ texto }) => {

  token = getToken()
  
  const config = {
    headers: {
      Authorization: token
    }
  }

  axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/api/autor`, { texto }, config)
    .then((response) => {
      const { data } = response
      return data
    })
}

export const putImageAutor = ({ image }) => {

  token = getToken()

  const config = {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data'
    }
  }

  axios
    .put(`${process.env.NEXT_PUBLIC_API_URL}/api/autor/image`, { image }, config)
    .then((response) => {
      const { data } = response
      return data
    })
}

export const putAutor = ({ texto, id }) => {

  token = getToken()

  const config = {
    headers: {
      Authorization: token
    }
  }

  axios
    .put(`${process.env.NEXT_PUBLIC_API_URL}/api/autor/${id}`, { texto }, config)
    .then((response) => {
      const { data } = response
      return data
    })
}