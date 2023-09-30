import React from 'react'
import styles from '@/styles/seccion.module.css'
import stylesMain from '@/styles/main.module.css'
import Back from '@/components/back'
import ListaAutor from '@/components/listaAutor'
import { Seccion } from '@/components/seccion'

export default async function Autor () {
  return (
    <div>
      <Back url='/' />
      <div className={stylesMain.main}>
        <Seccion titulo={'Autor'} info={'Indalecio Pérez Entrena'} />
        <div className={styles.marco}>
          <ListaAutor/>
        </div>
      </div>
    </div>
  )
}
