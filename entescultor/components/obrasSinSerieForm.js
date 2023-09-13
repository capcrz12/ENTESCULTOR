'use client'

import styles from '@/styles/gestion.module.css'
import { useEffect, useState } from 'react'
import { putSerieObra } from '@/services/obras'

export default function ObrasSinSerieForm ({ handleObrasSinSerie, setExito, obrasSinSerie, series }) {
  const [idObra, setIdObra] = useState('')
  const [serieId, setSerieId] = useState('')

  const handleSubmitSerie = async (event) => {
    event.preventDefault()

    try {
        const obraModificar = {
          serieId,
          id: idObra
        }

        putSerieObra(obraModificar)
        setExito('Modificado con éxito')
        setTimeout(() => {
          setExito('')
        }, 4000)
    
    } catch (error) {
      setExito('Error al realizar la subida')
      console.error(error)
    }
  }

  return (
    <div className={styles.formulario}>
      <button className={styles.cerrar} onClick={handleObrasSinSerie}>Cerrar</button>
      <h1 className={styles.error}>OBRAS SIN SERIE</h1>
      <form>
        {
          obrasSinSerie.lenght !== 0 ?
          <div>
            <label className={styles.title}>Estas obras no pertenecen a ninguna serie, seleccione la que desee y asígnele una serie:</label>
            <label className={styles.selector}>
            {obrasSinSerie.map(obra => (
              <label className={styles.serie} key={obra.id}>
                <article>
                  <div className={styles.obra} >
                    <img alt='No disponible' src={`http://localhost:3001${obra.url}`} className={styles.image} />
                    <h2 className={styles.texto}>{obra.title}</h2>
                  </div>
                </article>
                <input
                  type='radio'
                  name='idObra'
                  value={obra.id}
                  required
                  onChange={(event) => setIdObra(event.target.value)}
                />
              </label>
            ))}
              </label>
          </div>
          : 'No quedan obras sin serie'
          }
        </form>      
      {
        idObra !== '' ?
          <div>
            <form onSubmit={handleSubmitSerie}>
              <label>Asignarle una serie a la obra seleccionada:</label>
              <select
                name='serieId'
                value={serieId}
                required
                onChange={(event) => setSerieId(event.target.value)}>
                <option value='' disabled>{'Seleccione una serie'}</option>
                {series.map(serie => (
                <option key={serie.id} value={serie.id}>
                  {serie.name}
                </option>
              ))}
              </select>
              <button type='submit'>ASIGNAR SERIE</button>
            </form>
          </div>
        : ''
      }
      
    </div>
  )
}
