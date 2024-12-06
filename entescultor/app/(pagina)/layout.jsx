import React from 'react'
import '@/styles/globals.css'
import { Navigation } from '@/components/navigation'
import { Pie } from '@/components/pie'
import Image from 'next/image'

export default function RootLayout ({ children }) {
  return (
    <html lang='es'>
      <head>
        <title>ENTESTULTOR</title>
        <meta name='description' content='Página de esculturas de Indalecio Pérez Entrena' />
        <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.8.1/css/all.css' />
        <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Geist:wght@100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
        <meta charSet='utf-8' />
        <link rel='shortcut icon' href={`${process.env.NEXT_PUBLIC_API_URL}/images/icon/ent.jpg`} />
      </head>
      <body>
        <Navigation />
        <div>{children}</div>
        <Image className='imagen_fondo' priority src={`${process.env.NEXT_PUBLIC_API_URL}/images/fondos/fondo.jpg`} alt='fondo' width={400} height={600} />
        <footer>
          <Pie />
        </footer>
      </body>
    </html>
  )
}
