import React from 'react'
import Link from 'next/link'
import styles from '@/styles/series.module.css'
import { getAllSeries } from '@/services/series'

export default async function ListaSeries () {
  const series = await getAllSeries()

  return (
    <section className={styles.scroll}>
      <div className={styles.child}>
        {series.map(serie => (
          <article key={serie.id}>
            <div className={styles.contenedor}>
              <Link href={`/series/${serie.name}`} className={styles.serie}>
                <img alt='No disponible' src={`http://localhost:3001${serie.image}`} className={styles.image} />
                <h2 className={styles.texto}>{serie.name}</h2>
              </Link>
            </div>
          </article>
        ))}
        <div />
      </div>
    </section>
  )
}
