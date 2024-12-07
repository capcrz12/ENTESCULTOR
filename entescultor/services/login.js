import axios from 'axios'

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/login`

export const login = async credentials => {
  const { data } = await axios.post(baseUrl, credentials)
  return data
}

export const emailRecovery = async email => {
  const { data } = await axios.post(`${baseUrl}/email`, email)
  return data
}
