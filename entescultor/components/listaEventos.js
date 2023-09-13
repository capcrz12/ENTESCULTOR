import PlayerEventos from './playerEventos'
import { getAllEventos } from '@/services/eventos'

export default async function ListaEventos () {
  const eventos = await getAllEventos()

  return (
    <PlayerEventos eventos={eventos} />
  )
}
