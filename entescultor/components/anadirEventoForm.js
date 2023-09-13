'use client'

import styles from '@/styles/gestion.module.css'
import { useState, useEffect } from 'react'
import { createEvento } from '@/services/eventos'

export default function AnadirEventoForm ({ handleAnadirEvento, setExito }) {
  const [title, setTitle] = useState('')
  const [fecha, setFecha] = useState('')
  const [nota, setNota] = useState('')
  const [url, setUrl] = useState('')


  const handleSubmit = async (event) => {
    event.preventDefault()

    const eventoAnadir = {
      title,
      fecha,
      nota,
      url
    }
    
    try {      
      createEvento(eventoAnadir)
      setExito('Añadido con éxito')
      setTimeout(() => {
        setExito('')
      }, 4000)

      handleAnadirEvento()
    } catch (error) {
      setExito('Error al realizar la subida')
      console.error(error)
    }
  }

  return (
    <form className={styles.formulario} onSubmit={handleSubmit} encType="multipart/form-data">
      <button className={styles.cerrar} onClick={handleAnadirEvento}>Cerrar</button>
      <h1>AÑADIR EVENTO</h1>
      <div>
        <label>Título del Evento:</label>
        <input
          type='text'
          name='title'
          value={title}
          required
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        <label>Fecha del Evento:</label>
        <input
          type='text'
          name='fecha'
          value={fecha}
          required
          onChange={(event) => setFecha(event.target.value)}
        />
      </div>
      <div>
        <label>Nota del Artículo (ej: En julio de 2021 se inaugura la exposición \"Fragmentos\", le presentamos el vídeo )</label>
        <textarea
          type='text'
          cols="50" 
          rows="8"
          name='nota'
          value={nota}
          required
          className={styles.textoAutor}
          onChange={(event) => setNota(event.target.value)}
        />
      </div>
      <div>
        <label>Enlace al vídeo del evento:</label>
        <input
          type='url'
          name='url'
          value={url}
          required
          onChange={(event) => setUrl(event.target.value)}
        />
      </div>
      <button type='submit'>Añadir</button>
    </form>
  )
}
