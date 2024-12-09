'use client'

import React, { useState } from 'react'
import { resetPassword } from '@/services/login'

const ResetPasswordForm = ({ token }) => {
  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      resetPassword(token, newPassword)
      setMessage('Contraseña actualizada con éxito')
      setError('')
    } catch (error) {
      setError('Error actualizando la contraseña')
      setMessage('')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nueva Contraseña:</label>
          <input
            type='password'
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
        </div>
        <button type='submit'>Actualizar Contraseña</button>
      </form>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  )
}

export default ResetPasswordForm