import React from 'react'
import Login from '@/components/login'
import { getAllSeries } from '@/services/series'
import { getAllObras } from '@/services/obras'
import { getAutor } from '@/services/autor'
import { getAllArticulos } from '@/services/articulos'
import { getAllEventos } from '@/services/eventos'
import { getAllCriticas } from '@/services/criticas'

export default async function GestionIdentificacion () {

  const series = await getAllSeries()
  const obras = await getAllObras()
  const autor = await getAutor()
  const articulos = await getAllArticulos()
  const eventos = await getAllEventos()
  const criticas = await getAllCriticas()

  return (
    <Login 
      series={series}
      obras={obras} 
      autor={autor} 
      articulos={articulos} 
      eventos={eventos} 
      criticas={criticas} />
  )
}
