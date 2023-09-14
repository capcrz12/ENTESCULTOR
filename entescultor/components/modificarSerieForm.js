'use client'

import styles from '@/styles/gestion.module.css'
import { useEffect, useState } from 'react'
import { putTitleSerie, putImageSerie } from '@/services/series'

export default function ModificarSerieForm ({ handleModificarSerie, setExito, series }) {
  const [idSerie, setIdSerie] = useState('')
  const [nombreSerie, setNombreSerie] = useState('')
  const [obraUrl, setObraUrl] = useState('')

  useEffect (() => {
    const aux = series.find((series) => series.id === idSerie)

    if (aux !== undefined) {
      setNombreSerie(aux.name)
    }
  }, [idSerie])

  const handleSubmitTitle = async (event) => {
    event.preventDefault()

    try {
        const serieModificar = {
          name: nombreSerie,
          id: idSerie
        }

        putTitleSerie(serieModificar)
        setExito('Modificado con éxito')
        setTimeout(() => {
          setExito('')
        }, 4000)  
    } catch (error) {
      setExito('Error al realizar la subida')
      console.error(error)
    }
  }

  const handleSubmitImage = async (event) => {
    event.preventDefault()

    try {
        const serieModificar = {
          image: obraUrl,
          id: idSerie
        }

        putImageSerie(serieModificar)
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
      <button className={styles.cerrar} onClick={handleModificarSerie}>Cerrar</button>
      <h1>MODIFICAR SERIE</h1>
      <form>
        <div>
            <label className={styles.title}>Seleccione la serie a modificar:</label>
            <label className={styles.selector}>
            {series.map(serie => (
              <label className={styles.serie} key={serie.id}>
                <article>
                  <div className={styles.serie} >
                    <img alt='No disponible' src={`http://localhost:3001${serie.image}`} className={styles.image} />
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
      <div>
      <form className={styles.mini} onSubmit={handleSubmitTitle}>
        <div>
          <label>Cambiar el nombre de la serie: </label>
          <input 
            type='text'
            name='nombreSerie'
            value={nombreSerie}
            onChange={(event) => setNombreSerie(event.target.value)}
          />
        </div>
        <button type='submit'>CAMBIAR</button>
      </form>

      <form className={styles.mini} onSubmit={handleSubmitImage}>
        <label className={styles.title}>Para cambiar la foto de la serie, seleccione una nueva miniatura:</label>
        <label className={styles.selector}>
          {series.find((series) => series.id === idSerie).obras.map(obra => (
            obra.images.map(image => (
            <label className={styles.serie} key={image}>
              <article>
                <div className={styles.obra} >
                  <img alt='No disponible' src={`http://localhost:3001${image}`} className={styles.image} />
                </div>
              </article>
              <input
                type='radio'
                name='obraUrl'
                value={image}
                required
                onChange={(event) => setObraUrl(event.target.value)}
              />
            </label>
            ))
          ))}
        </label>
        <button type='submit'>CAMBIAR</button>  
      </form>
      </div>
      : ''
      }
    </div>
  )
}
