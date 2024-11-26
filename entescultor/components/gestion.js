'use client'

import styles from '@/styles/gestion.module.css'
import React, { useState } from 'react'
import AnadirSerieForm from './anadirSerieForm'
import AnadirObraForm from './anadirObraForm'
import AnadirAutorForm from './anadirAutorForm'
import AnadirArticuloForm from './anadirArticuloForm'
import AnadirEventoForm from './anadirEventoForm'
import AnadirCriticaForm from './anadirCriticaForm'
import ModificarSerieForm from './modificarSerieForm'
import ModificarObraForm from './modificarObraForm'
import ModificarAutorForm from './ModificarAutorForm'
import ModificarArticuloForm from './modificarArticuloForm'
import ModificarEventoForm from './modificarEventoForm'
import ModificarCriticaForm from './modificarCriticaForm'
import EliminarSerieForm from './eliminarSerieForm'
import EliminarObraForm from './eliminarObraForm'
import EliminarArticuloForm from './eliminarArticuloForm'
import EliminarEventoForm from './eliminarEventoForm'
import EliminarCriticaForm from './eliminarCriticaForm'
import ObrasSinSerieForm from './obrasSinSerieForm'

export default function Gestion ({ handleLogout, series, obras, autor, articulos, eventos, criticas }) {
  const [opcion, setOpcion] = useState(0)
  const [exito, setExito] = useState('')
  const [obrasSinSerie, setObrasSinSerie] = useState([])

  const handleCrearSerie = () => {
    setOpcion(opcion != 1 ? 1 : 0)
  }
  const handleCrearObra = () => {
    setOpcion(opcion != 2 ? 2 : 0)
  }
  const handleAnadirAutor = () => {
    setOpcion(opcion != 3 ? 3 : 0)
  }
  const handleAnadirArticulo = () => {
    setOpcion(opcion != 4 ? 4 : 0)
  }
  const handleAnadirEvento = () => {
    setOpcion(opcion != 5 ? 5 : 0)
  }
  const handleAnadirCritica = () => {
    setOpcion(opcion != 6 ? 6 : 0)
  }

  const handleModificarSerie = () => {
    setOpcion(opcion != 7 ? 7 : 0)
  }
  const handleModificarObra = () => {
    setOpcion(opcion != 8 ? 8 : 0)
  }
  const handleModificarAutor = () => {
    setOpcion(opcion != 9 ? 9 : 0)
  }
  const handleModificarArticulo = () => {
    setOpcion(opcion != 10 ? 10 : 0)
  }
  const handleModificarEvento = () => {
    setOpcion(opcion != 11 ? 11 : 0)
  }
  const handleModificarCritica = () => {
    setOpcion(opcion != 12 ? 12 : 0)
  }

  const handleEliminarSerie = () => {
    setOpcion(opcion != 13 ? 13 : 0)

    // Una vez borrada una serie, se comprueba si las obras que le pertenecían se quedan "huérfanas de serie"
    setObrasSinSerie (obras.filter((obra) => { return obra.serieId === null }))
  }
  const handleEliminarObra = () => {
    setOpcion(opcion != 14 ? 14 : 0)
  }
  const handleEliminarArticulo = () => {
    setOpcion(opcion != 15 ? 15 : 0)
  }
  const handleEliminarEvento = () => {
    setOpcion(opcion != 16 ? 16 : 0)
  }
  const handleEliminarCritica = () => {
    setOpcion(opcion != 17 ? 17 : 0)
  }

  const handleObrasSinSerie = () => {
    setOpcion(opcion != 18 ? 18 : 0)
  }

  return (
    <div>
      <button className={styles.cerrar} onClick={handleLogout}>Cerrar Sesión</button>
      <div className={styles.opciones}>
        {
          obrasSinSerie.length !== 0 ?
            <div className={styles.obrasSinSerie}>
              { 
                opcion === 0 ?
                  <h3 className={styles.error}>¡ATENCIÓN! Existen obras que no están asignadas a ninguna serie y no podrán ser visualizadas. Pulse en Obras Sin Serie para solucionarlo</h3>
                  : ''
              }
              <button onClick={handleObrasSinSerie} className={styles.error}>{opcion === 18 ? 'Cerrar menu Obras Sin Serie' : 'Obras Sin Serie'}</button>
            </div>
            : ''
        }

        <div>
          <h2>AÑADIR ELEMENTOS</h2>
          <button onClick={handleCrearSerie}>{opcion === 1 ? 'Cerrar menu Crear Serie' : 'Crear serie'}</button>
          <button onClick={handleCrearObra}>{opcion === 2 ? 'Cerrar menu Crear Obra' : 'Crear obra'}</button>
          {/* <button onClick={handleAnadirAutor}>{opcion === 3 ? 'Cerrar menu Añadir Autor' : 'Añadir autor'}</button> */}
          <button onClick={handleAnadirArticulo}>{opcion === 4 ? 'Cerrar menu Añadir Artículo' : 'Añadir artículo'}</button>
          <button onClick={handleAnadirEvento}>{opcion === 5 ? 'Cerrar menu Añadir Evento' : 'Añadir evento'}</button>
          <button onClick={handleAnadirCritica}>{opcion === 6 ? 'Cerrar menu Añadir Crítica' : 'Añadir crítica'}</button>
        </div>
        <div>
          <h2>MODIFICAR ELEMENTOS</h2>
          <button onClick={handleModificarSerie}>{opcion === 7 ? 'Cerrar menu Modificar Serie' : 'Modificar serie'}</button>
          <button onClick={handleModificarObra}>{opcion === 8 ? 'Cerrar menu Modificar Obra' : 'Modificar obra'}</button>
          <button onClick={handleModificarAutor}>{opcion === 9 ? 'Cerrar menu Modificar Autor' : 'Modificar autor'}</button>
          <button onClick={handleModificarArticulo}>{opcion === 10 ? 'Cerrar menu Modificar Artículo' : 'Modificar artículo'}</button>
          <button onClick={handleModificarEvento}>{opcion === 11 ? 'Cerrar menu Modificar Evento' : 'Modificar evento'}</button>
          <button onClick={handleModificarCritica}>{opcion === 12 ? 'Cerrar menu Modificar Crítica' : 'Modificar crítica'}</button>
        </div>
        <div>
          <h2>ELIMINAR ELEMENTOS</h2>
          <button onClick={handleEliminarSerie}>{opcion === 13 ? 'Cerrar menu Eliminar Serie' : 'Eliminar serie'}</button>
          <button onClick={handleEliminarObra}>{opcion === 14 ? 'Cerrar menu Eliminar Obra' : 'Eliminar obra'}</button>
          <button onClick={handleEliminarArticulo}>{opcion === 15 ? 'Cerrar menu Eliminar Artículo' : 'Eliminar artículo'}</button>
          <button onClick={handleEliminarEvento}>{opcion === 16 ? 'Cerrar menu Eliminar Evento' : 'Eliminar evento'}</button>
          <button onClick={handleEliminarCritica}>{opcion === 17 ? 'Cerrar menu Eliminar Crítica' : 'Eliminar crítica'}</button>
        </div>
      </div>

      <div>
        {
          opcion === 1
            ? <AnadirSerieForm handleCrearSerie={handleCrearSerie} setExito={setExito} />
            : ''
        }
      </div>
      <div>
        {
          opcion === 2
            ? <AnadirObraForm handleCrearObra={handleCrearObra} setExito={setExito} series={series} />
            : ''
        }
      </div>
      <div>
        {
          opcion === 3
            ? <AnadirAutorForm handleAnadirAutor={handleAnadirAutor} setExito={setExito} />
            : ''
        }
      </div>
      <div>
        {
          opcion === 4
            ? <AnadirArticuloForm handleAnadirArticulo={handleAnadirArticulo} setExito={setExito} />
            : ''
        }
      </div>
      <div>
        {
          opcion === 5
            ? <AnadirEventoForm handleAnadirEvento={handleAnadirEvento} setExito={setExito} />
            : ''
        }
      </div>
      <div>
        {
          opcion === 6
            ? <AnadirCriticaForm handleAnadirCritica={handleAnadirCritica} setExito={setExito} />
            : ''
        }
      </div>
      <div>
        {
          opcion === 7
            ? <ModificarSerieForm handleModificarSerie={handleModificarSerie} setExito={setExito} series={series} />
            : ''
        }
      </div>
      <div>
        {
          opcion === 8
            ? <ModificarObraForm handleModificarObra={handleModificarObra} setExito={setExito} obras={obras} series={series} />
            : ''
        }
      </div>
      <div>
        {
          opcion === 9
            ? <ModificarAutorForm handleModificarAutor={handleModificarAutor} setExito={setExito} autor={autor} />
            : ''
        }
      </div>
      <div>
        {
          opcion === 10
            ? <ModificarArticuloForm handleModificarArticulo={handleModificarArticulo} setExito={setExito} articulos={articulos} />
            : ''
        }
      </div>
      <div>
        {
          opcion === 11
            ? <ModificarEventoForm handleModificarEvento={handleModificarEvento} setExito={setExito} eventos={eventos} />
            : ''
        }
      </div>
      <div>
        {
          opcion === 12
            ? <ModificarCriticaForm handleModificarCritica={handleModificarCritica} setExito={setExito} criticas={criticas} />
            : ''
        }
      </div>
      <div>
        {
          opcion === 13
            ? <EliminarSerieForm handleEliminarSerie={handleEliminarSerie} setExito={setExito} series={series} />
            : ''
        }
      </div>
      <div>
        {
          opcion === 14
            ? <EliminarObraForm handleEliminarObra={handleEliminarObra} setExito={setExito} obras={obras} series={series} />
            : ''
        }
      </div>
      <div>
        {
          opcion === 15
            ? <EliminarArticuloForm handleEliminarArticulo={handleEliminarArticulo} setExito={setExito} articulos={articulos} />
            : ''
        }
      </div>
      <div>
        {
          opcion === 16
            ? <EliminarEventoForm handleEliminarEvento={handleEliminarEvento} setExito={setExito} eventos={eventos} />
            : ''
        }
      </div>
      <div>
        {
          opcion === 17
            ? <EliminarCriticaForm handleEliminarCritica={handleEliminarCritica} setExito={setExito} criticas={criticas} />
            : ''
        }
      </div>
      <div>
        {
          opcion === 18
            ? <ObrasSinSerieForm handleObrasSinSerie={handleObrasSinSerie} setExito={setExito} obrasSinSerie={obrasSinSerie} series={series} />
            : ''
        }
      </div>
      <div className={styles.exito}>
        {exito || ''}
      </div>
    </div>
  )
}
