import styles from '@/styles/seccion.module.css'
import React from 'react'
import { getAutor } from '@/services/autor'

export default async function ListaAutor () {
  const autor = await getAutor()

  return (
    <div>
      <div className={styles.texto}>
        {autor[0].texto}
      </div>
      <div className={styles.pie}>
        <img alt='No disponible' src={`${autor[0].image}`} className={styles.imagenAutor} />
      </div>
    </div>
  )
}
