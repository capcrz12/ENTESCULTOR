'use client'

import styles from '@/styles/gestion.module.css'
import React, { useState } from 'react'
import { createTextoAutor, putImageAutor } from '@/services/autor'

export default function AnadirAutorForm ({ handleAnadirAutor, setExito }) {
  const [texto, setTexto] = useState('')
  const [image, setImage] = useState([])

  const handleSubmitTexto = async (event) => {
    event.preventDefault()

    const textoAnadir = {
      texto
    }
    
    try {      
      createTextoAutor(textoAnadir)
      setExito('Añadido con éxito')
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

    const imageAnadir = {
      image
    }
    
    try {      
      putImageAutor(imageAnadir)
      setExito('Añadido con éxito')
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
      <form className={styles.mini} onSubmit={handleSubmitTexto}>
        <button className={styles.cerrar} onClick={handleAnadirAutor}>Cerrar</button>
        <h1>AÑADIR TEXTO AUTOR</h1>
        <div>
          <label>Texto a añadir:</label>
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
        <div>   
          <p>¡ATENCION! Recuerde que esto sustituirá el contenido actual de Autor, 
        si quiere añadir texto adicional vaya al formulario Modificar autor</p>
        </div>
        <button type='submit'>AÑADIR TEXTO ( y borrar el anterior )</button>
      </form>

      <form className={styles.mini} onSubmit={handleSubmitImage} encType="multipart/form-data">
        <label>Imagen del autor:</label>
        <input
          type='file'
          name='image'
          required
          accept="image/jpeg"
          onChange={(event) => setImage(event.target.files[0])}
        />
        <p>Solo se aceptan imagenes con extensión .jpg</p>
        <div>   
          <p>¡ATENCION! Recuerde que esto sustituirá la imagen actual de Autor, si existe</p>
        </div>
        <button type='submit'>AÑADIR IMAGEN ( y sustituir la anterior )</button>
      </form>
      
    </div>
  )
}
