import axios from 'axios'

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/login`

export const login = async credentials => {
  const { data } = await axios.post(baseUrl, credentials)
  return data
}
