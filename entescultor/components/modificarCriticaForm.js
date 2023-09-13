'use client'

import styles from '@/styles/gestion.module.css'
import { useEffect, useState } from 'react'
import { putAutorCritica, putFechaCritica, putTextoCritica } from '@/services/criticas'


export default function ModificarCriticaForm ({ handleModificarCritica, setExito, criticas }) {
  const [idCritica, setIdCritica] = useState('')
  const [autor, setAutor] = useState('')
  const [fecha, setFecha] = useState('')
  const [texto, setTexto] = useState('')

  useEffect (() => {
    const aux = criticas.find((criticas) => criticas.id === idCritica)

    if (aux !== undefined) {
      setAutor(aux.autor)
      setFecha(aux.fecha)
      setTexto(aux.texto)
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
        </div>
        : ''
      }
    </div>
  )
}
