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
        <meta charSet='utf-8' />
        <link rel='shortcut icon' href='http://localhost:3001/images/icon/ent.jpg' />
      </head>
      <body>
        <Navigation />
        <div>{children}</div>
        <Image className='imagen_fondo' priority src='http://localhost:3001/images/fondos/fondo.jpg' alt='fondo' width={400} height={600} />
        <footer>
          <Pie />
        </footer>
      </body>
    </html>
  )
}
