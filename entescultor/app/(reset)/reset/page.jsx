'use client'

import React, { useEffect, useState } from 'react'
import ResetPasswordForm from '@/components/resetPasswordForm'
import { checkToken } from '@/services/login'

const ResetPasswordPage = ({ searchParams }) => {
  const { token } = searchParams
  const [isValid, setIsValid] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await checkToken(token)
        setIsValid(true)
      } catch (error) {
        setIsValid(false)
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      verifyToken()
    } else {
      setLoading(false)
    }
  }, [token])

  if (loading) {
    return <div>Cargando...</div>
  }

  if (!isValid) {
    return (
      <div>
        <h1>Token inválido o expirado</h1>
        <p>Por favor, solicita un nuevo enlace de reseteo de contraseña.</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Restablecer Contraseña</h1>
      <ResetPasswordForm token={token} />
    </div>
  )
}

export default ResetPasswordPage