import React from 'react'
import Link from 'next/link'
import styles from '@/styles/pie.module.css'

export function Pie () {
  return (
    <div className={styles.div}>
      <nav>
        <div className={styles.barra}>
          <div className={styles.correos}>
            <p>indalecio@entescultor.com</p>
            <p>parainda@hotmail.com</p>
          </div>
          <Link href='https://www.facebook.com/entescultor/' target='_blank' className={styles.facebook}>
            <i className='fab fa-facebook' />
          </Link>
        </div>
      </nav>
    </div>
  )
}


