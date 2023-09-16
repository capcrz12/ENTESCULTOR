import React from 'react'
import styles from '@/styles/gestion.module.css'

export default function GestionLayout ({ children }) {
  return (
    <html lang='es'>
      <head>
        <title>ENTESTULTOR</title>
        <meta name='description' content='Página de esculturas de Indalecio Pérez Entrena' />
        <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.8.1/css/all.css' />
        <meta charSet='utf-8' />
        <link rel='shortcut icon' href='#' />
      </head>
      <body className={styles.layout}>
        <div>{children}</div>
      </body>
    </html>

  )
}
