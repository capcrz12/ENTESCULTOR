'use client'

import styles from '@/styles/gestion.module.css'
import React, { useEffect, useState } from 'react'
import { putAutorCritica, putFechaCritica, putTextoCritica, deleteImageCritica, uploadImageCritica } from '@/services/criticas'


export default function ModificarCriticaForm ({ handleModificarCritica, setExito, criticas }) {
  const [idCritica, setIdCritica] = useState('')
  const [autor, setAutor] = useState('')
  const [fecha, setFecha] = useState('')
  const [texto, setTexto] = useState('')
  const [imageOriginal, setImageOriginal] = useState([])
  const [nombreImage, setNombreImage] = useState('')
  const [nuevaImage, setNuevaImage] = useState([])

  useEffect (() => {
    const aux = criticas.find((criticas) => criticas.id === idCritica)

    if (aux !== undefined) {
      setAutor(aux.autor)
      setFecha(aux.fecha)
      setTexto(aux.texto)
      setImageOriginal(aux.images)
    }
  }, [idCritica])

  const handleSubmitAutor = async (event) => {
    event.preventDefault()

    try {
      const autorModificar = {
        autor,
        id: idCritica
      }

      putAutorCritica(autorModificar)
      setExito('Modificado con éxito')
      setTimeout(() => {
        setExito('')
      }, 4000)
 
    } catch (error) {
      setExito('Error al realizar la subida')
      console.error(error)
    }
  }

  const handleSubmitFecha = async (event) => {
    event.preventDefault()

    try {
      const fechaModificar = {
        fecha,
        id: idCritica
      }
        
      putFechaCritica(fechaModificar)
      setExito('Modificado con éxito')
      setTimeout(() => {
        setExito('')
      }, 4000)
 
    } catch (error) {
      setExito('Error al realizar la subida')
      console.error(error)
    }
  }

  const handleSubmitTexto = async (event) => {
    event.preventDefault()

    try {
      const textoModificar = {
        texto,
        id: idCritica
      }

      putTextoCritica(textoModificar)
      setExito('Modificado con éxito')
      setTimeout(() => {
        setExito('')
      }, 4000)
 
    } catch (error) {
      setExito('Error al realizar la subida')
      console.error(error)
    }
  }

  const handleSubmitDeleteImage = async (event) => {
    event.preventDefault()

    try {
      const eventoModificar = {
        image: nombreImage,
        id: idCritica
      }

      deleteImageCritica(eventoModificar)
      setExito('Modificado con éxito')
      setTimeout(() => {
        setExito('')
      }, 4000)

    } catch (error) {
      setExito('Error al realizar la subida')
      console.error(error)
    }
  }

  const handleSubmitUploadImage = async (event) => {
    event.preventDefault()

    try {
      const eventoModificar = {
        image: nuevaImage,
        id: idCritica
      }

      uploadImageCritica(eventoModificar)
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
      <button className={styles.cerrar} onClick={handleModificarCritica}>Cerrar</button>
      <h1>MODIFICAR CRÍTICA</h1>
      <form>
        <div>
          <label>Seleccione la crítica a modificar:</label>
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
          <div>
            <form className={styles.mini} onSubmit={handleSubmitAutor}>
              <div>
                <label>Aquí tiene el nombre del autor de la crítica seleccionada, puede modificarla: </label>
                <textarea
                  type='text'
                  cols="50" 
                  rows="4"
                  name='autor'
                  value={autor}
                  required
                  className={styles.textoAutor}
                  onChange={(event) => setAutor(event.target.value)}
                />
              </div>
              <button type='submit'>CAMBIAR TITULO</button>
            </form>

            <form className={styles.mini} onSubmit={handleSubmitFecha}>
              <div>
                <label>Aquí tiene la fecha de la crítica seleccionada, puede modificarla: </label>
                <textarea
                  type='text'
                  cols="20" 
                  rows="1"
                  name='fecha'
                  value={fecha}
                  required
                  className={styles.textoAutor}
                  onChange={(event) => setFecha(event.target.value)}
                />
              </div>
              <button type='submit'>CAMBIAR FECHA</button>
            </form>

            <form className={styles.mini} onSubmit={handleSubmitTexto}>
              <div>
                <label>Aquí tiene el texto de la crítica seleccionada, puede modificarla: </label>
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

            <label>Eliminar una imagen de la crítica seleccionada.</label>
            <label>Imagenes actuales:</label>
            <form>
              <label className={styles.selector}>
                { imageOriginal.map(image => (
                  <label className={styles.serie} key={image}>
                    <article>
                      <img alt='No disponible' src={`${image}`} className={styles.image} />
                    </article>
                    <input
                      type='radio'
                      name='nombreImage'
                      value={image}
                      required
                      onChange={(event) => setNombreImage(event.target.value)}
                    />
                  </label>
                ))}
              </label>
            </form>
            { nombreImage !== '' ?
              <form className={styles.mini} onSubmit={handleSubmitDeleteImage} encType="multipart/form-data">
                <label className={styles.error}>Para eliminar la imagen seleccionada, pulse eliminar:</label>
                <button type='submit' className={styles.error}>ELIMINAR</button>  
              </form>
              : ''
            }
            <form onSubmit={handleSubmitUploadImage} encType="multipart/form-data">
              <label>Añadir una imagen nueva de la crítica:</label>
              <input
                type='file'
                name='image'
                required
                accept="image/jpeg"
                onChange={(event) => setNuevaImage(event.target.files[0])}
              />
              <p>Solo se aceptan imagenes con extensión .jpg</p>
              <button type='submit'>AÑADIR IMAGEN</button>  
            </form>
          </div>
          : ''
      }
    </div>
  )
}
