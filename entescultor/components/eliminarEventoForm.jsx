'use client'

import styles from '@/styles/gestion.module.css'
import React, { useState, useEffect } from 'react'
import { deleteEvento } from '@/services/eventos'

export default function EliminarEventoForm ({ handleEliminarEvento, setExito, eventos }) {
  const [idEvento, setIdEvento] = useState('')
  const [title, setTitle] = useState('')
  const [fecha, setFecha] = useState('')
  const [nota, setNota] = useState('')
  const [enlace, setEnlace] = useState('')
  const [url, setUrl] = useState('')

  useEffect (() => {
    const aux = eventos.find((eventos) => eventos.id === idEvento)

    if (aux !== undefined) {
      setTitle(aux.title)
      setFecha(aux.fecha)
      setNota(aux.nota)
      setEnlace(aux.enlace)
      setUrl(aux.url)
    }
  }, [idEvento])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const eliminarEvento = {
      id: idEvento
    }

    try {
      deleteEvento(eliminarEvento)
      setExito('Eliminado con éxito')
      setTimeout(() => {
        setExito('')
      }, 4000)  
      handleEliminarEvento()
    } catch (error) {
      setExito('Error al realizar la subida')
      console.error(error)
    }
  }

  return (
    <div className={styles.formulario}>
      <button className={styles.cerrar} onClick={handleEliminarEvento}>Cerrar</button>
      <h1>ELIMINAR EVENTO</h1>
      <form>
        <div>
          <label>Seleccione el evento a eliminar:</label>
          <select
            name='evento'
            value={idEvento}
            required
            onChange={(event) => setIdEvento(event.target.value)}>
            <option value='' disabled>Seleccione el evento</option>
            {eventos.map(evento => (
              <option key={evento.id} value={evento.id}>
                {evento.title}
              </option>
            ))}
          </select>
        </div>
      </form>

      {
        idEvento !== '' ?
          <form className={styles.mini} onSubmit={handleSubmit}>
            <h3 className={styles.error}>EVENTO QUE VA A ELIMINAR</h3>
            <label><strong>{title}</strong></label>
            <label>{fecha}</label>
            <label>{nota}</label>
            <label><strong>{enlace}</strong></label>
            <label><strong>{url}</strong></label>
            <button type='submit' className={styles.error}>ELIMINAR DEFINITIVAMENTE</button>
          </form>
          :
          ''
      }
    </div>
  )
}
