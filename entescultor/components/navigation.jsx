'use client'

import Link from 'next/link'
import styles from '@/styles/navigation.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'

const links = [
  {
    label: 'Inicio',
    route: '/'
  },
  {
    label: 'Obras',
    route: '/series'
  },
  {
    label: 'Autor',
    route: '/autor'
  },
  {
    label: 'Articulos',
    route: '/articulos'
  },
  {
    label: 'Eventos',
    route: '/eventos'
  },
  {
    label: 'Criticas',
    route: '/criticas'
  }]

export function Navigation () {
  const [active, setActive] = useState(true)

  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <FontAwesomeIcon className={styles.hamburguesa} icon={faBars} onClick={() => setActive(!active)} />
        <ul className={styles.entescultor}>ENTESCULTOR</ul>
        <ul className={`${active ? styles.navigationLatI : styles.showI}`}>
          {links.slice(0,links.length/2).map(({ label, route }) => (
            <li key={route}>
              <Link href={route} onClick={() => setActive(!active)}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className={`${active ? styles.navigationLatD : styles.showD}`}>
          {links.slice(-links.length/2).map(({ label, route }) => (
            <li key={route}>
              <Link href={route} onClick={() => setActive(!active)}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={`${active ? styles.div : styles.showFooter}`}>
        <div className={styles.barra}>
          <div>
            <p>indalecio@entescultor.com</p>
            <p>parainda@hotmail.com</p>
          </div>
          <Link href='https://www.facebook.com/entescultor/' target='_blank' className={styles.facebook}>
            <i className='fab fa-facebook' />
          </Link>
        </div>
      </div>
    </header>
  )
}
