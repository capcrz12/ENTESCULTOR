'use client'

import styles from '@/styles/gestion.module.css'
import { useState, useEffect } from 'react'
import { deleteObra } from '@/services/obras'

export default function EliminarObraForm ({ handleEliminarObra, setExito, obras, series }) {
  const [idObra, setIdObra] = useState('')
  const [idSerie, setIdSerie] = useState('')
  const [nombreObra, setNombreObra] = useState('')
  const [obrasFiltro, setObrasFiltro] = useState([])
  const [obraImages, setObraImages] = useState([])

  useEffect (() => {
    const aux = obras.find((obras) => obras.id === idObra)

    if (aux !== undefined) {
      setObraImages(aux.images)
      setNombreObra(aux.title)
    }
  }, [idObra])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const eliminarObra = {
      id: idObra
    }

    try {
      deleteObra(eliminarObra)
      setExito('Modificado con éxito')
      setTimeout(() => {
        setExito('')
      }, 4000)  
      handleEliminarObra()
    } catch (error) {
      setExito('Error al realizar la subida')
      console.error(error)
    }
  }

  return (
    <div className={styles.formulario}>
      <button className={styles.cerrar} onClick={handleEliminarObra}>Cerrar</button>
      <h1>ELIMINAR OBRA</h1>
      <form>
        <div>
          <label>Filtrar por series: (Si una serie no contiene obras, se seguirán mostrando todas)</label>
          <select
            name='serie'
            value={idSerie}
            required
            onChange={(event) => { setIdSerie(event.target.value)
                                  setObrasFiltro (obras.filter((obras) => {
                                                  if (obras.serieId !== null) {
                                                    return obras.serieId.id === event.target.value
                                                  }
                                                 })
                                                )
            }}>
            <option value='' onChange={(event) => setObrasFiltro (obras.filter((obras) => {
                                                  if (obras.serieId !== null) {
                                                    return obras.serieId.id === event.target.value
                                                  }
                                                 })
                                                )
            }>Mostrar todas las obras</option>
            {series.map(serie => (
            <option key={serie.id} value={serie.id}>
              {serie.name}
            </option>
          ))}
          </select>
        </div>
        { obrasFiltro.length === 0
        ?
        <div>
            <label className={styles.title}>Seleccione la obra a eliminar:</label>
            <label className={styles.selector}>
            {obras.map(obra => (
              <label className={styles.obra} key={obra.id}>
                <article>
                  <div className={styles.obra} >
                    <img alt='No disponible' src={`http://localhost:3001${obra.images[0]}`} className={styles.image} />
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
          : 
          <div>
            <label className={styles.title}>Seleccione la obra a modificar:</label>
            <label className={styles.selector}>
            {obrasFiltro.map(obra => (
              <label className={styles.serie} key={obra.id}>
                <article>
                  <div className={styles.obra} >
                    <img alt='No disponible' src={`http://localhost:3001${obra.images[0]}`} className={styles.image} />
                    <h2 className={styles.texto}>{obra.title}</h2>
                    <div>
                      <div>Largo: {obra.largo}</div>
                      <div>Alto: {obra.alto}</div>
                      <div>Ancho: {obra.ancho}</div>
                      <div>Material: {obra.material}</div>
                    </div>
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
        }
        </form>

      {
        idObra !== '' ?
      <form className={styles.mini} onSubmit={handleSubmit}>
        <h3 className={styles.error}>OBRA QUE VA A ELIMINAR</h3>
        <div>
          <label>{nombreObra}</label>
        </div>
        <div>
          { obraImages.map(image =>  (
            <label key={image}>
              <img alt='No disponible' src={`http://localhost:3001${image}`} className={styles.image} />
            </label>
          ))
          }
        </div>
        <button type='submit' className={styles.error}>ELIMINAR DEFINITIVAMENTE</button>
      </form>
        :
        ''
      }
    </div>
  )
}
