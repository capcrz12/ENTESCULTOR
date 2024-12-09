import React from 'react'
import ResetPasswordForm from '@/components/resetPasswordForm'
import { checkToken } from '@/services/login'

const ResetPasswordPage = async ({ searchParams }) => {
  const { token } = searchParams

  if (!token) {
    return (
      <div>
        <h1>Usted no tiene acceso a esta página</h1>
      </div>
    )
  }

  let isValid = false
  try {
    checkToken(token)
    isValid = true
  } catch (error) {
    isValid = false
    console.log(error)
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