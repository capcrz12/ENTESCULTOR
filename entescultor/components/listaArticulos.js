import React from 'react'
import CarruselArticulos from './carruselArticulos'
import { getAllArticulos } from '@/services/articulos'

export default async function ListaArticulos () {
  const articulos = await getAllArticulos()

  return (
    <CarruselArticulos articulos={articulos} />
  )
}
