import React from 'react'
import styles from '@/styles/seccion.module.css'
import stylesMain from '@/styles/main.module.css'
import Back from '@/components/back'
import ListaAutor from '@/components/listaAutor'

export default async function Autor () {
  return (
    <div>
      <Back url='/' />
      <div className={stylesMain.main}>
        <div className={styles.presentacion}>
          <div className={styles.indalecio}>Autor</div>
          <div className={styles.info_autor}>Indalecio Pérez Entrena</div>
        </div>
        <div className={styles.marco}>
          <ListaAutor/>
        </div>
      </div>
    </div>
  )
}
