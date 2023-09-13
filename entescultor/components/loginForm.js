import styles from '@/styles/gestion.module.css'

export default function LoginForm ({ handleLogin, nombreUsuario, setNombreUsuario, password, setPassword, error }) {
  return (
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
    </form>
  )
}
