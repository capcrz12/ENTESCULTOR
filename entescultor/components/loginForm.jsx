import styles from '@/styles/gestion.module.css'
import React, { useState } from 'react'

export default function LoginForm ({ handleLogin, handleEmail, nombreUsuario, setNombreUsuario, password, setPassword, email, setEmail, error, mensaje }) {
  const [showRecovery, setShowRecovery] = useState(false)

  return (
    <div>
      {!showRecovery ? (
        <form className={styles.identificacion} onSubmit={handleLogin}>
          <div>
            <label>Usuario:</label>
            <input
              type='text'
              name='nombreUsuario'
              value={nombreUsuario}
              onChange={(event) => setNombreUsuario(event.target.value)} // Para poner en el estado el nombre del usuario
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type='password'
              name='password'
              value={password}
              onChange={(event) => setPassword(event.target.value)} // Para poner en el estado el password
            />
          </div>
          <div className={styles.error}>
            {error || ''}
          </div>
          <button type='submit'>Iniciar Sesión</button>
          <text className={styles.fotgot} onClick={() => setShowRecovery(true)}>¿Olvidaste tu contraseña?</text>
        </form>
      ) : (
        <form className={styles.identificacion} onSubmit={handleEmail}>
          <div>
            <label>Correo Electrónico:</label>
            <input
              type='email'
              name='email'
              value={email}
              onChange={(event) => setEmail(event.target.value)} // Para poner en el estado el correo electrónico
            />
          </div>
          <div className={styles.error}>
            {error || ''}
          </div>
          <div className={styles.mensaje}>
            {mensaje || ''}
          </div>
          <button type='submit'>Enviar correo de recuperación</button>
          <button type='button' onClick={() => setShowRecovery(false)}>Volver</button>
        </form>
      )}
    </div>
  )
}