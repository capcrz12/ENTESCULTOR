'use client'

import styles from '@/styles/gestion.module.css'
import React, { useEffect, useState } from 'react'
import { putAutor, putImageAutor } from '@/services/autor'


export default function ModificarAutorForm ({ handleModificarAutor, setExito, autor }) {
  const [texto, setTexto] = useState('')
  const [image, setImage] = useState([])

  const idAutor = autor[0].id
  let textoOriginal = autor[0].texto
  let imageOriginal = autor[0].image

  console.log(image)

  useEffect (() => {
    setTexto(textoOriginal)
    setImage(imageOriginal)
  }, [])

  const handleSubmitTexto = async (event) => {
    event.preventDefault()

    try {
      const textoModificar = {
        texto,
        id: idAutor
      }

      putAutor(textoModificar)
      setExito('Modificado con éxito')
      setTimeout(() => {
        setExito('')
      }, 4000)

      handleModificarAutor()
 
    } catch (error) {
      setExito('Error al realizar la subida')
      console.error(error)
    }
  }

  const handleSubmitImage = async (event) => {
    event.preventDefault()

    const imageModificar = {
      image
    }
    
    try {      
      putImageAutor(imageModificar)
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
      <button className={styles.cerrar} onClick={handleModificarAutor}>Cerrar</button>
      <h1>MODIFICAR AUTOR</h1>
      <form className={styles.mini} onSubmit={handleSubmitTexto}>
        <div>
          <label>Aquí tiene el texto de Autor, puede modificarlo: </label>
          <textarea
            type='text'
            cols="50" 
            rows="30"
            name='texto'
            value={texto}
            required
            className={styles.textoAutor}
            onChange={(event) => setTexto(event.target.value)}
          />
        </div>
        <button type='submit'>CAMBIAR TEXTO</button>
      </form>

      <form className={styles.mini} onSubmit={handleSubmitImage} encType="multipart/form-data">
        <label>Imagen del autor actual:</label>
        <div>
          <img alt='No disponible' src={`http://localhost:3001${imageOriginal}`} className={styles.image} />
        </div>
        <label>Cambiar imagen de autor actual:</label>
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
