import React from 'react'
import styles from '@/styles/obras.module.css'
import AmpliarImagen from './ampliarImagen'
import { getObrasBySerie } from '@/services/obras'

export default async function ListaObras ({ name }) {
  const obras = await getObrasBySerie(name)

  console.log(obras)

  return (
    <section className={styles.scroll}>
      <div className={styles.child}>
        {obras.map(obra => (
          <article key={obra.id}>
            <div className={styles.contenedor}>
              <div className={styles.serie}>
                <div>
                  <h2 className={styles.texto}>{obra.title}</h2>
                  <div className={styles.info}>
                    <div>
                      <p>MATERIAL</p>
                      <div>{obra.material}</div>
                    </div>
                    <div>
                      <p>DIMENSIONES</p>
                      <div>{obra.alto} x {obra.ancho} x {obra.largo}</div>
                    </div>
                  </div>
                </div>
                <div className={styles.imagen}>
                  <AmpliarImagen obra={obra} />
                </div>
              </div>
            </div>
          </article>
        ))}
        <div />
      </div>
    </section>
  )
}
