'use client'

import styles from '@/styles/gestion.module.css'
import React, { useEffect, useState } from 'react'
import { putTitleArticulo, putFechaArticulo, putTextoArticulo, putUrlArticulo, putImageArticulo } from '@/services/articulos'


export default function ModificarArticuloForm ({ handleModificarArticulo, setExito, articulos }) {
  const [idArticulo, setIdArticulo] = useState('')
  const [title, setTitle] = useState('')
  const [fecha, setFecha] = useState('')
  const [texto, setTexto] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState([])
  const [imageOriginal, setImageOriginal] = useState([])


  useEffect (() => {
    const aux = articulos.find((articulos) => articulos.id === idArticulo)

    if (aux !== undefined) {
      setTitle(aux.title)
      setFecha(aux.fecha)
      setTexto(aux.texto)
      setUrl(aux.url)
      setImageOriginal(aux.image)

    }
  }, [idArticulo])

  const handleSubmitTitle = async (event) => {
    event.preventDefault()

    try {
      const tituloModificar = {
        title,
        id: idArticulo
      }

      putTitleArticulo(tituloModificar)
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
        id: idArticulo
      }

      putFechaArticulo(fechaModificar)
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
        id: idArticulo
      }

      putTextoArticulo(textoModificar)
      setExito('Modificado con éxito')
      setTimeout(() => {
        setExito('')
      }, 4000)
 
    } catch (error) {
      setExito('Error al realizar la subida')
      console.error(error)
    }
  }

  const handleSubmitUrl = async (event) => {
    event.preventDefault()

    try {
      const urlModificar = {
        url,
        id: idArticulo
      }

      putUrlArticulo(urlModificar)
      setExito('Modificado con éxito')
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

    try {
      const articuloModificar = {
        image,
        id: idArticulo
      }

      putImageArticulo(articuloModificar)
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
      <button className={styles.cerrar} onClick={handleModificarArticulo}>Cerrar</button>
      <h1>MODIFICAR ARTÍCULO</h1>
      <form>
        <div>
          <label>Seleccione el artículo a modificar:</label>
          <select
            name='articulo'
            value={idArticulo}
            required
            onChange={(event) => setIdArticulo(event.target.value)}>
            <option value='' disabled>Seleccione el artículo</option>
            {articulos.map(articulo => (
              <option key={articulo.id} value={articulo.id}>
                {articulo.title}
              </option>
            ))}
          </select>
        </div>
      </form>

      {
        idArticulo !== '' ?
          <div>
            <form className={styles.mini} onSubmit={handleSubmitTitle}>
              <div>
                <label>Aquí tiene el título del artículo seleccionado, puede modificarlo: </label>
                <textarea
                  type='text'
                  cols="50" 
                  rows="4"
                  name='title'
                  value={title}
                  required
                  className={styles.textoAutor}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </div>
              <button type='submit'>CAMBIAR TITULO</button>
            </form>

            <form className={styles.mini} onSubmit={handleSubmitFecha}>
              <div>
                <label>Aquí tiene la fecha del artículo seleccionado, puede modificarla: </label>
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
                <label>Aquí tiene el texto del artículo seleccionado, puede modificarlo: </label>
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

            <form className={styles.mini} onSubmit={handleSubmitUrl}>
              <div>
                <label>Aquí tiene la url del artículo seleccionado, puede modificarlo: </label>
                <textarea
                  type='text'
                  cols="50" 
                  rows="5"
                  name='url'
                  value={url}
                  required
                  className={styles.textoAutor}
                  onChange={(event) => setUrl(event.target.value)}
                />
              </div>
              <button type='submit'>CAMBIAR URL</button>
            </form>

            <form className={styles.mini} onSubmit={handleSubmitImage} encType="multipart/form-data">
              <label>Imagen actual:</label>
              <div>
                <img alt='No tiene o no está disponible' src={`${process.env.NEXT_PUBLIC_API_URL}${imageOriginal}`} className={styles.image} />
              </div>
              <label className={styles.title}>Para cambiar la foto de la serie, seleccione una nueva (se borrará la antigua):</label>
              <input
                type='file'
                name='image'
                required
                accept="image/jpeg"
                onChange={(event) => setImage(event.target.files[0])}
              />
              <p>Solo se aceptan imagenes con extensión .jpg</p>
              <button type='submit'>CAMBIAR</button>  
            </form>
          </div>
          : ''
      }
    </div>
  )
}
