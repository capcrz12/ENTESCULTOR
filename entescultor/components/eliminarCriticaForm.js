'use client'

import styles from '@/styles/gestion.module.css'
import React, { useState, useEffect } from 'react'
import { deleteCritica } from '@/services/criticas'

export default function EliminarCriticaForm ({ handleEliminarCritica, setExito, criticas }) {
  const [idCritica, setIdCritica] = useState('')
  const [autor, setAutor] = useState('')
  const [fecha, setFecha] = useState('')
  const [texto, setTexto] = useState('')
  const [images, setImages] = useState([])

  useEffect (() => {
    const aux = criticas.find((criticas) => criticas.id === idCritica)

    if (aux !== undefined) {
      setAutor(aux.autor)
      setFecha(aux.fecha)
      setTexto(aux.texto)
      setImages(aux.images)
    }
  }, [idCritica])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const eliminarCritica = {
      id: idCritica
    }

    try {
      deleteCritica(eliminarCritica)
      setExito('Eliminado con éxito')
      setTimeout(() => {
        setExito('')
      }, 4000)  
      handleEliminarCritica()
    } catch (error) {
      setExito('Error al realizar la subida')
      console.error(error)
    }
  }

  return (
    <div className={styles.formulario}>
      <button className={styles.cerrar} onClick={handleEliminarCritica}>Cerrar</button>
      <h1>ELIMINAR CRITICA</h1>
      <form>
        <div>
          <label>Seleccione la crítica a eliminar:</label>
          <select
            name='critica'
            value={idCritica}
            required
            onChange={(event) => setIdCritica(event.target.value)}>
            <option value='' disabled>Seleccione la crítica</option>
            {criticas.map(critica => (
              <option key={critica.id} value={critica.id}>
                {critica.autor} {critica.fecha}
              </option>
            ))}
          </select>
        </div>
      </form>

      {
        idCritica !== '' ?
          <form className={styles.mini} onSubmit={handleSubmit}>
            <h3 className={styles.error}>CRITICA QUE VA A ELIMINAR</h3>
            <label><strong>{autor}</strong></label>
            <label>{fecha}</label>
            <label>{texto}</label>
            <label className={styles.selector}>
              { images.map(image => (
                <label className={styles.serie} key={image}>
                  <article>
                    <img alt='No disponible' src={`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}${image}`} className={styles.image} />
                  </article>
                </label>
              ))}
            </label>
            <button type='submit' className={styles.error}>ELIMINAR DEFINITIVAMENTE</button>
          </form>
          :
          ''
      }
    </div>
  )
}
