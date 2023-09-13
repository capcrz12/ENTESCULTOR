'use client'

import styles from '@/styles/gestion.module.css'
import { useState, useEffect } from 'react'
import { createArticulo } from '@/services/articulos'

export default function AnadirArticuloForm ({ handleAnadirArticulo, setExito }) {
  const [titulo, setTitulo] = useState('')
  const [fecha, setFecha] = useState('')
  const [texto, setTexto] = useState('')
  const [image, setImage] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const articuloAnadir = {
      titulo,
      fecha,
      texto,
      image,
      url
    }
    
    try {      
      createArticulo(articuloAnadir)
      setExito('Añadido con éxito')
      setTimeout(() => {
        setExito('')
      }, 4000)

      handleAnadirArticulo()
    } catch (error) {
      setExito('Error al realizar la subida')
      console.error(error)
    }
  }

  return (
    <form className={styles.formulario} onSubmit={handleSubmit} encType="multipart/form-data">
      <button className={styles.cerrar} onClick={handleAnadirArticulo}>Cerrar</button>
      <h1>AÑADIR ARTÍCULO</h1>
      <div>
        <label>Título del Artículo:</label>
        <input
          type='text'
          name='titulo'
          value={titulo}
          required
          onChange={(event) => setTitulo(event.target.value)}
        />
      </div>
      <div>
        <label>Fecha del Artículo:</label>
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
          className={styles.textoAutor}
          onChange={(event) => setTexto(event.target.value)}
        />
      </div>
      <div>
        <label>Captura del Artículo o pie de foto:</label>
        <input
          type='file'
          name='image'
          accept="image/jpeg"
          onChange={(event) => setImage(event.target.files[0])}
        />
        <p>Solo se aceptan imagenes con extensión .jpg</p>
      </div>
      <div>
        <label>Enlace al artículo:</label>
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
