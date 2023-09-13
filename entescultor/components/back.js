import Link from 'next/link'
import styles from '@/styles/navigation.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'

export default function Back ({ url }) {
  return (
    <div className={styles.back}>
      <Link href={url}>
        <FontAwesomeIcon icon={faArrowLeftLong} />
        <div>Atrás</div>
      </Link>
    </div>
  )
}
