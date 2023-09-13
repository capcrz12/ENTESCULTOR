'use client'

import styles from '@/styles/gestion.module.css'
import { useState, useEffect } from 'react'
import { createCritica } from '@/services/criticas'

export default function AnadirCriticaForm ({ handleAnadirCritica, setExito }) {
  const [autor, setAutor] = useState('')
  const [fecha, setFecha] = useState('')
  const [texto, setTexto] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const criticaAnadir = {
      autor,
      fecha,
      texto
    }
    
    try {      
      createCritica(criticaAnadir)
      setExito('Añadido con éxito')
      setTimeout(() => {
        setExito('')
      }, 4000)

      handleAnadirCritica()
    } catch (error) {
      setExito('Error al realizar la subida')
      console.error(error)
    }
  }

  return (
    <form className={styles.formulario} onSubmit={handleSubmit} encType="multipart/form-data">
      <button className={styles.cerrar} onClick={handleAnadirCritica}>Cerrar</button>
      <h1>AÑADIR CRÍTICA</h1>
      <div>
        <label>Autor de la crítica:</label>
        <input
          type='text'
          name='autor'
          value={autor}
          required
          onChange={(event) => setAutor(event.target.value)}
        />
      </div>
      <div>
        <label>Fecha de la crítica:</label>
        <input
          type='text'
          name='fecha'
          value={fecha}
          required
          onChange={(event) => setFecha(event.target.value)}
        />
      </div>
      <div>
        <label>Texto del Artículo:</label>
        <textarea
          type='text'
          cols="50" 
          rows="12"
          name='texto'
          value={texto}
          required
          className={styles.textoAutor}
          onChange={(event) => setTexto(event.target.value)}
        />
      </div>
      <button type='submit'>Añadir</button>
    </form>
  )
}
