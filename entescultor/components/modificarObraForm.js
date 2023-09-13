'use client'

import styles from '@/styles/gestion.module.css'
import { useEffect, useState } from 'react'
import { putTitleObra, putAltoObra, putAnchoObra, putLargoObra, putMaterialObra, putSerieObra, putImageObra } from '@/services/obras'

export default function ModificarObraForm ({ handleModificarObra, setExito, obras, series }) {
  const [idObra, setIdObra] = useState('')
  const [idSerie, setIdSerie] = useState('')
  const [obrasFiltro, setObrasFiltro] = useState([])
  const [nombreObra, setNombreObra] = useState('')
  const [alto, setAlto] = useState(0)
  const [ancho, setAncho] = useState(0)
  const [largo, setLargo] = useState(0)
  const [material, setMaterial] = useState('')
  const [serieId, setSerieId] = useState('')
  const [image, setImage] = useState([])
  const [imageOriginal, setImageOriginal] = useState([])

  const handleSubmitNombre = async (event) => {
    event.preventDefault()

    try {
        const obraModificar = {
          title: nombreObra,
          id: idObra
        }

        putTitleObra(obraModificar)
        setExito('Modificado con éxito')
        setTimeout(() => {
          setExito('')
        }, 4000)
 
    } catch (error) {
      setExito('Error al realizar la subida')
      console.error(error)
    }
  }

  const handleSubmitAlto = async (event) => {
    event.preventDefault()

    try {
        const obraModificar = {
          alto,
          id: idObra
        }

        putAltoObra(obraModificar)
        setExito('Modificado con éxito')
        setTimeout(() => {
          setExito('')
        }, 4000)
    
    } catch (error) {
      setExito('Error al realizar la subida')
      console.error(error)
    }
  }

  const handleSubmitAncho = async (event) => {
    event.preventDefault()

    try {
        const obraModificar = {
          ancho,
          id: idObra
        }

        putAnchoObra(obraModificar)
        setExito('Modificado con éxito')
        setTimeout(() => {
          setExito('')
        }, 4000)
    
    } catch (error) {
      setExito('Error al realizar la subida')
      console.error(error)
    }
  }

  const handleSubmitLargo = async (event) => {
    event.preventDefault()

    try {
        const obraModificar = {
          largo,
          id: idObra
        }

        putLargoObra(obraModificar)
        setExito('Modificado con éxito')
        setTimeout(() => {
          setExito('')
        }, 4000)
    
    } catch (error) {
      setExito('Error al realizar la subida')
      console.error(error)
    }
  }

  const handleSubmitMaterial = async (event) => {
    event.preventDefault()

    try {
        const obraModificar = {
          material,
          id: idObra
        }

        putMaterialObra(obraModificar)
        setExito('Modificado con éxito')
        setTimeout(() => {
          setExito('')
        }, 4000)
    
    } catch (error) {
      setExito('Error al realizar la subida')
      console.error(error)
    }
  }

  const handleSubmitSerie = async (event) => {
    event.preventDefault()

    try {
        const obraModificar = {
          serieId,
          id: idObra
        }

        putSerieObra(obraModificar)
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
        const ObraModificar = {
          image,
          id: idObra
        }

        putImageObra(ObraModificar)
        setExito('Modificado con éxito')
        setTimeout(() => {
          setExito('')
        }, 4000)

    } catch (error) {
      setExito('Error al realizar la subida')
      console.error(error)
    }
  }

  const seleccionar = (event) => {
    setIdObra(event.target.value)
    const obra = obras.find(obras => obras.id === event.target.value)
    setNombreObra(obra.title)
    setAlto(obra.alto)
    setAncho(obra.ancho)
    setLargo(obra.largo)
    setMaterial(obra.material)
    setImage(obra.url)
    setImageOriginal(obra.url)
  }

  return (
    <div className={styles.formulario}>
      <button className={styles.cerrar} onClick={handleModificarObra}>Cerrar</button>
      <h1>MODIFICAR OBRA</h1>
      <form>
        <div>
          <label>Filtrar por series: (Si una serie no contiene obras, se seguirán mostrando todas)</label>
          <select
            name='serie'
            value={idSerie}
            required
            onChange={(event) => { setIdSerie(event.target.value)
                                  setObrasFiltro (obras.filter((obras) => {
                                                  if (obras.serieId !== null) {
                                                    return obras.serieId.id === event.target.value
                                                  }
                                                 })
                                                )
            }}>
            <option value='' onChange={(event) => setObrasFiltro (obras.filter((obras) => {
                                                  if (obras.serieId !== null) {
                                                    return obras.serieId.id === event.target.value
                                                  }
                                                 })
                                                )
            }>Mostrar todas las obras</option>
            {series.map(serie => (
            <option key={serie.id} value={serie.id}>
              {serie.name}
            </option>
          ))}
          </select>
        </div>
        { obrasFiltro.length === 0
        ?
        <div>
            <label className={styles.title}>Seleccione la obra a modificar:</label>
            <label className={styles.selector}>
            {obras.map(obra => (
              <label className={styles.serie} key={obra.id}>
                <article>
                  <div className={styles.obra} >
                    <img alt='No disponible' src={`http://localhost:3001${obra.url}`} className={styles.image} />
                    <h2 className={styles.texto}>{obra.title}</h2>
                    <div>
                      <div>Largo: {obra.largo}</div>
                      <div>Alto: {obra.alto}</div>
                      <div>Ancho: {obra.ancho}</div>
                      <div>Material: {obra.material}</div>
                    </div>
                  </div>
                </article>
                <input
                  type='radio'
                  name='idObra'
                  value={obra.id}
                  required
                  onChange={(event) => seleccionar(event)}
                />
              </label>
            ))}
              </label>
          </div>
          : 
          <div>
            <label className={styles.title}>Seleccione la obra a modificar:</label>
            <label className={styles.selector}>
            {obrasFiltro.map(obra => (
              <label className={styles.serie} key={obra.id}>
                <article>
                  <div className={styles.obra} >
                    <img alt='No disponible' src={`http://localhost:3001${obra.url}`} className={styles.image} />
                    <h2 className={styles.texto}>{obra.title}</h2>
                    <div>
                      <div>Largo: {obra.largo}</div>
                      <div>Alto: {obra.alto}</div>
                      <div>Ancho: {obra.ancho}</div>
                      <div>Material: {obra.material}</div>
                    </div>
                  </div>
                </article>
                <input
                  type='radio'
                  name='idObra'
                  value={obra.id}
                  required
                  onChange={(event) => seleccionar(event)}
                />
              </label>
            ))}
              </label>
          </div>
        }
        </form>

      
      {
        idObra !== '' ?
      <div>
      <form className={styles.mini} onSubmit={handleSubmitNombre}>
        <div>
          <label>Cambiar el nombre de la obra: </label>
          <input 
            type='text'
            name='nombreObra'
            value={nombreObra}
            onChange={(event) => setNombreObra(event.target.value)}
          />
        </div>
        <button type='submit'>CAMBIAR NOMBRE</button>
      </form>

      <form className={styles.mini} onSubmit={handleSubmitAlto}>
        <div>
          <label>Cambiar el alto de la obra (cm): </label>
          <input 
            type='number'
            name='alto'
            value={alto}
            onChange={(event) => setAlto(event.target.value)}
          />
        </div>
        <button type='submit'>CAMBIAR ALTO</button>
      </form>

      <form className={styles.mini} onSubmit={handleSubmitAncho}>
        <div>
          <label>Cambiar el ancho de la obra (cm): </label>
          <input 
            type='number'
            name='ancho'
            value={ancho}
            onChange={(event) => setAncho(event.target.value)}
          />
        </div>
        <button type='submit'>CAMBIAR ANCHO</button>
      </form>

      <form className={styles.mini} onSubmit={handleSubmitLargo}>
        <div>
          <label>Cambiar el largo de la obra (cm): </label>
          <input 
            type='number'
            name='largo'
            value={largo}
            onChange={(event) => setLargo(event.target.value)}
          />
        </div>
        <button type='submit'>CAMBIAR LARGO</button>
      </form>

      <form className={styles.mini} onSubmit={handleSubmitMaterial}>
        <div>
          <label>Cambiar el material de la obra: </label>
          <input 
            type='text'
            name='material'
            value={material}
            onChange={(event) => setMaterial(event.target.value)}
          />
        </div>
        <button type='submit'>CAMBIAR MATERIAL</button>
      </form>

      <form onSubmit={handleSubmitSerie}>
        <label>Cambiar serie a la que pertenece:</label>
        <select
          name='serieId'
          value={serieId}
          required
          onChange={(event) => setSerieId(event.target.value)}>
          <option value='' disabled>{'Seleccione una serie'}</option>
          {series.map(serie => (
          <option key={serie.id} value={serie.id}>
            {serie.name}
          </option>
        ))}
        </select>
        <button type='submit'>CAMBIAR SERIE</button>
      </form>

      <form className={styles.mini} onSubmit={handleSubmitImage} encType="multipart/form-data">
        <label>Imagen actual:</label>
        <div>
          <img alt='No disponible' src={`http://localhost:3001${imageOriginal}`} className={styles.image} />
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
