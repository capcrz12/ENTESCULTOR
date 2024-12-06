'use client'

import styles from '@/styles/gestion.module.css'
import React, { useState, useEffect } from 'react'
import { deleteArticulo } from '@/services/articulos'

export default function EliminarArticuloForm ({ handleEliminarArticulo, setExito, articulos }) {
  const [idArticulo, setIdArticulo] = useState('')
  const [title, setTitle] = useState('')
  const [fecha, setFecha] = useState('')
  const [texto, setTexto] = useState('')
  const [url, setUrl] = useState('')

  useEffect (() => {
    const aux = articulos.find((articulos) => articulos.id === idArticulo)

    if (aux !== undefined) {
      setTitle(aux.title)
      setFecha(aux.fecha)
      setTexto(aux.texto)
      setUrl(aux.url)
    }
  }, [idArticulo])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const eliminarArticulo = {
      id: idArticulo
    }

    try {
      deleteArticulo(eliminarArticulo)
      setExito('Eliminado con éxito')
      setTimeout(() => {
        setExito('')
      }, 4000)  
      handleEliminarArticulo()
    } catch (error) {
      setExito('Error al realizar la subida')
      console.error(error)
    }
  }

  return (
    <div className={styles.formulario}>
      <button className={styles.cerrar} onClick={handleEliminarArticulo}>Cerrar</button>
      <h1>ELIMINAR ARTICULO</h1>
      <form>
        <div>
          <label>Seleccione el artículo a eliminar:</label>
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
          <form className={styles.mini} onSubmit={handleSubmit}>
            <h3 className={styles.error}>ARTICULO QUE VA A ELIMINAR</h3>
            <label><strong>{title}</strong></label>
            <label>{fecha}</label>
            <label>{texto}</label>
            <label><strong>{url}</strong></label>
            <button type='submit' className={styles.error}>ELIMINAR DEFINITIVAMENTE</button>
          </form>
          :
          ''
      }
    </div>
  )
}
