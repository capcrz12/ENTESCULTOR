'use client'

import styles from '@/styles/gestion.module.css'
import React, { useState, useEffect } from 'react'
import { deleteSerie } from '@/services/series'

export default function EliminarSerieForm ({ handleEliminarSerie, setExito, series }) {
  const [idSerie, setIdSerie] = useState('')
  const [nombreSerie, setNombreSerie] = useState('')

  useEffect (() => {
    const aux = series.find((series) => series.id === idSerie)

    if (aux !== undefined) {
      setNombreSerie(aux.name)
    }
  }, [idSerie])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const eliminarSerie = {
      id: idSerie
    }

    try {
      deleteSerie(eliminarSerie)
      setExito('Eliminado con éxito')
      setTimeout(() => {
        setExito('')
      }, 4000)  
      handleEliminarSerie()
    } catch (error) {
      setExito('Error al realizar la subida')
      console.error(error)
    }
  }

  return (
    <div className={styles.formulario}>
      <button className={styles.cerrar} onClick={handleEliminarSerie}>Cerrar</button>
      <h1>ELIMINAR SERIE</h1>
      <form>
        <div className={styles.listaSeries}>
          <label className={styles.title}>Seleccione la serie a eliminar:</label>
          <label className={styles.selector}>
            {series.map(serie => (
              <label className={styles.serie} key={serie.id}>
                <article>
                  <div className={styles.serie} >
                    <img alt='No disponible' src={`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}${serie.image}`} className={styles.image} />
                    <h2 className={styles.texto}>{serie.name}</h2>
                  </div>
                </article>
                <input
                  type='radio'
                  name='idSerie'
                  value={serie.id}
                  required
                  onChange={(event) => setIdSerie(event.target.value)}
                />
              </label>
            ))}
          </label>
        </div>
      </form>

      {
        idSerie !== '' ?
          <form className={styles.mini} onSubmit={handleSubmit}>
            <h3 className={styles.error}>SERIE QUE VA A ELIMINAR</h3>
            <div>
              <label>{nombreSerie}</label>
            </div>
            <div>
              <label><img alt='No disponible' src={`${process.env.NEXT_PUBLIC_API_URL}:${process.env.API_PORT}${series.find((series) => series.id === idSerie).image}`} className={styles.image} /></label>
            </div>
            <button type='submit' className={styles.error}>ELIMINAR DEFINITIVAMENTE</button>
          </form>
          :
          ''
      }
    </div>
  )
}
