import React from 'react'
import styles from '@/styles/seccion.module.css'

export function Seccion ({ titulo, info }) {
  const nombre = decodeURI(titulo)

  return (
    <div className={styles.presentacion}>
      <div className={styles.indalecio}>{nombre}</div>
      <div className={styles.info_titulo}>{info}</div>
    </div>
  )
}
