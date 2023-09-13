import CarruselCriticas from './carruselCriticas'
import { getAllCriticas } from '@/services/criticas'

export default async function ListaCriticas () {
  const criticas = await getAllCriticas()

  return (
    <CarruselCriticas criticas={criticas} />
  )
}
