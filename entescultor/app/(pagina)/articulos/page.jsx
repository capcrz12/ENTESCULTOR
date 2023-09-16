import React from 'react'
import styles from '@/styles/seccion.module.css'
import stylesMain from '@/styles/main.module.css'
import ListaArticulos from '@/components/listaArticulos'
import Back from '@/components/back'

export default function Articulos () {
  return (
    <div><Back url='/' />
      <div className={stylesMain.main}>
        <div className={styles.presentacion}>
          <div className={styles.indalecio}>Artículos</div>
        </div>
        <div className={styles.marco}>
          <ListaArticulos />
        </div>
      </div>
    </div>
  )
}
