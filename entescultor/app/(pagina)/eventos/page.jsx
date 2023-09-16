import React from 'react'
import styles from '@/styles/seccion.module.css'
import stylesMain from '@/styles/main.module.css'
import ListaEventos from '@/components/listaEventos'
import Back from '@/components/back'

export default function Eventos () {
  return (
    <div>
      <Back url='/' />
      <div className={stylesMain.main}>
        <div className={styles.presentacion}>
          <div className={styles.indalecio}>Eventos</div>
          <div className={styles.info_autor} />
        </div>
        <div className={styles.marco}>
          <ListaEventos />
        </div>
      </div>
    </div>
  )
}
