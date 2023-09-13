'use client'

import styles from '@/styles/gestion.module.css'
import { useState, useEffect } from 'react'
import { login } from '@/services/login'
import { setToken } from '@/services/token'
import LoginForm from '@/components/loginForm'
import Gestion from '@/components/gestion'

export default function Login ({series, obras, autor, articulos, eventos, criticas}) {
  const [nombreUsuario, setNombreUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [usuario, setUsuario] = useState(null)
  const [error, setError] = useState('')

  // Para recuperar del localStorage el token y asi tener la sesion abierta al recargar
  useEffect(() => {
    const UsuarioLogueadoJSON = window.localStorage.getItem('UsuarioLogueado')
    if (UsuarioLogueadoJSON) {
      const usuario = JSON.parse(UsuarioLogueadoJSON)
      setUsuario(usuario)
      setToken(usuario.token)
    }
  }, [])

  const handleLogin = async (event) => {
    // Previene por defecto para no hacer un post al action del formulario (no tenemos action),
    // es decir, queremos controlar lo que hace el submit
    event.preventDefault()

    setError('')

    try {
      const usuario = await login({
        nombreUsuario,
        password
      })

      // Guardamos el usuario en el lado del cliente para mantener la sesion iniciada
      // Lo correcto sería hacerlo con cookies en el lado del servidor
      window.localStorage.setItem(
        'UsuarioLogueado', JSON.stringify(usuario)
      )

      setToken(usuario.token)
      setUsuario(usuario)
      setNombreUsuario('')
      setPassword('')
    } catch (error) {
      console.error(error)
      setError('Credenciales incorrectas')
    }
  }

  const handleLogout = () => {
    setUsuario(null)
    setToken(usuario.token)

    window.localStorage.removeItem('UsuarioLogueado')
  }

  return (
    <div className={styles.pagina}>
      <h1>GESTION</h1>
      <div>
        {
          usuario
            ? <Gestion 
                handleLogout={handleLogout} 
                series={series}
                obras={obras} 
                autor={autor} 
                articulos={articulos} 
                eventos={eventos} 
                criticas={criticas} 
              />

            : <div>
              <h2>IDENTIFICACIÓN</h2>
              <LoginForm
                handleLogin={handleLogin}
                nombreUsuario={nombreUsuario}
                setNombreUsuario={setNombreUsuario}
                password={password}
                setPassword={setPassword}
                error={error}
              />
              </div>
        }
      </div>
    </div>
  )
}
