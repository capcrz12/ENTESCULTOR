import ListaObras from '@/components/listaObras'
import { Seccion } from '@/components/seccion'
import Back from '@/components/back'

export default async function Obras ({ params }) {
  const { name } = params

  return (
    <div>
      <Back url='/series' />
      <Seccion titulo={name} info='' />
      <ListaObras name={name} />
    </div>
  )
}
