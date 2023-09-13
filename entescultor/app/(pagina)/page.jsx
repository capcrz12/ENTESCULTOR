import styles from '@/styles/seccion.module.css'
import Carrusel from '@/components/carrusel'
import { getAllObras } from '@/services/obras'

export default async function HomePage () {
  const obras = await getAllObras()

  return (
    <div className={styles.presentacion}>
      <div className={styles.indalecio}>Indalecio <br />Pérez Entrena</div>
      <div className={styles.info}>Pulsa el play para realizar un recorrido a través de las series y obras del autor, Indalecio Pérez Entrena</div>
      <div className={styles.play}>
        <Carrusel imagenes={obras} />
        <div className={styles.separador} />
        <div className={styles.recorrido}>INICIAR RECORRIDO</div>
      </div>
    </div>
  )
}
