import ListaSeries from '@/components/listaSeries'
import { Seccion } from '@/components/seccion'
import Back from '@/components/back'

export default async function Series () {
  return (
    <div>
      <Back url='/' />
      <Seccion titulo='Series' info='Selecciona la serie que quieres visualizar deslizando hacia abajo' />
      <ListaSeries />
    </div>
  )
}
