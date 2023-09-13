'use client'

import styles from '@/styles/gestion.module.css'
import { useState } from 'react'
import { createSerie } from '@/services/series'

export default function AnadirSerieForm ({ handleCrearSerie, setExito }) {
  const [nombreSerie, setNombreSerie] = useState('')
  const [image, setImage] = useState([])

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const serieAnadir = {
        name: nombreSerie,
        image
      }

      if (image.name.split('.').pop() === 'jpg'){
        createSerie(serieAnadir)
        setExito('Añadido con éxito')
        setTimeout(() => {
          setExito('')
        }, 4000)
      }
      else {
        console.error(error)
        setExito('Error al realizar la subida')
      }

      handleCrearSerie()
    } catch (error) {
      setExito('Error al realizar la subida')
      console.error(error)
    }
  }

  return (
    <form className={styles.formulario} onSubmit={handleSubmit} encType="multipart/form-data">
      <button className={styles.cerrar} onClick={handleCrearSerie}>Cerrar</button>
      <h1>AÑADIR SERIE</h1>
      <div>
        <label>Nombre de la serie:</label>
        <input
          type='text'
          name='nombreSerie'
          value={nombreSerie}
          required
          onChange={(event) => setNombreSerie(event.target.value)}
        />
      </div>
      <div>
        <label>Imagen de miniatura de la serie:</label>
        <input
          type='file'
          name='image'
          required
          accept="image/jpeg"
          onChange={(event) => setImage(event.target.files[0])}
        />
        <p>Solo se aceptan imagenes con extensión .jpg</p>
      </div>
      <button type='submit'>Añadir</button>
    </form>
  )
}
