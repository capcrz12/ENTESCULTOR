'use client'

import styles from '@/styles/gestion.module.css'
import { useEffect, useState } from 'react'
import { putTitleEvento, putFechaEvento, putNotaEvento, putEnlaceEvento, putUrlEvento, deleteImageEvento, uploadImageEvento } from '@/services/eventos'


export default function ModificarEventoForm ({ handleModificarEventos, setExito, eventos }) {
  const [idEvento, setIdEvento] = useState('')
  const [title, setTitle] = useState('')
  const [fecha, setFecha] = useState('')
  const [nota, setNota] = useState('')
  const [enlace, setEnlace] = useState('')
  const [url, setUrl] = useState('')
  const [imageOriginal, setImageOriginal] = useState([])
  const [nombreImage, setNombreImage] = useState('')
  const [nuevaImage, setNuevaImage] = useState([])


  useEffect (() => {
    const aux = eventos.find((eventos) => eventos.id === idEvento)

    if (aux !== undefined) {
      setTitle(aux.title)
      setFecha(aux.fecha)
      setNota(aux.nota)
      setEnlace(aux.enlace)
      setUrl(aux.url)
      setImageOriginal(aux.images)
    }
  }, [idEvento])

  const handleSubmitTitle = async (event) => {
    event.preventDefault()

    try {
        const tituloModificar = {
          title,
          id: idEvento
        }

        putTitleEvento(tituloModificar)
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
          id: idEvento
        }

        putFechaEvento(fechaModificar)
        setExito('Modificado con éxito')
        setTimeout(() => {
          setExito('')
        }, 4000)
 
    } catch (error) {
      setExito('Error al realizar la subida')
      console.error(error)
    }
  }

  const handleSubmitNota = async (event) => {
    event.preventDefault()

    try {
        const notaModificar = {
          nota,
          id: idEvento
        }

        putNotaEvento(notaModificar)
        setExito('Modificado con éxito')
        setTimeout(() => {
          setExito('')
        }, 4000)
 
    } catch (error) {
      setExito('Error al realizar la subida')
      console.error(error)
    }
  }

  const handleSubmitEnlace = async (event) => {
    event.preventDefault()

    try {
        const enlaceModificar = {
          enlace,
          id: idEvento
        }

        putEnlaceEvento(enlaceModificar)
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
          id: idEvento
        }

        putUrlEvento(urlModificar)
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
          id: idEvento
        }

        deleteImageEvento(eventoModificar)
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
          id: idEvento
        }

        uploadImageEvento(eventoModificar)
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
      <button className={styles.cerrar} onClick={handleModificarEventos}>Cerrar</button>
      <h1>MODIFICAR EVENTO</h1>
      <form>
      <div>
        <label>Seleccione el evento a modificar:</label>
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
        <div>
          <form className={styles.mini} onSubmit={handleSubmitTitle}>
            <div>
              <label>Aquí tiene el título del evento seleccionado, puede modificarlo: </label>
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
              <label>Aquí tiene la fecha del evento seleccionado, puede modificarla: </label>
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

          <form className={styles.mini} onSubmit={handleSubmitNota}>
            <div>
              <label>Aquí tiene el texto/nota del evento seleccionado, puede modificarla: </label>
              <textarea
              type='text'
              cols="50" 
              rows="30"
              name='nota'
              value={nota}
              required
              className={styles.textoAutor}
              onChange={(event) => setNota(event.target.value)}
              />
            </div>
            <button type='submit'>CAMBIAR NOTA</button>
          </form>

          <form className={styles.mini} onSubmit={handleSubmitEnlace}>
            <div>
              <label>Aquí tiene el enlace al artículo del evento seleccionado, puede modificarla: </label>
              <textarea
              type='text'
              cols="50" 
              rows="5"
              name='enlace'
              value={enlace}
              required
              className={styles.textoAutor}
              onChange={(event) => setEnlace(event.target.value)}
              />
            </div>
            <button type='submit'>CAMBIAR ENLACE</button>
          </form>

          <form className={styles.mini} onSubmit={handleSubmitUrl}>
            <div>
              <label>Aquí tiene la url de youtube del evento seleccionado, puede modificarla: </label>
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

          <label>Eliminar una imagen del evento seleccionado.</label>
          <label>Imagenes actuales:</label>
            <form>
              <label className={styles.selector}>
                { imageOriginal.map(image => (
                  <label className={styles.serie} key={image}>
                    <article>
                      <img alt='No disponible' src={`http://localhost:3001${image}`} className={styles.image} />
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
            <label>Añadir una imagen nueva del evento:</label>
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
