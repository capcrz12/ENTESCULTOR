import React from 'react'
import styles from '@/styles/seccion.module.css'
import stylesMain from '@/styles/main.module.css'
import ListaCriticas from '@/components/listaCriticas'
import Back from '@/components/back'

export default function Criticas () {
  return (
    <div><Back url='/' />
      <div className={stylesMain.main}>
        <div className={styles.presentacion}>
          <div className={styles.indalecio}>Críticas</div>
          <div className={styles.info_autor} />
        </div>
        <div className={styles.marco}>
          <ListaCriticas />
        </div>
      </div>
    </div>
  )
}
