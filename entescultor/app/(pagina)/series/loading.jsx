import styles from '@/styles/loading.module.css'

export default function Loading () {
  return (
    <div>
      <h1>Series</h1>
      <div className={styles.loading}>Cargando imagenes...</div>
    </div>
  )
}
