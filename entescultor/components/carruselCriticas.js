'use client'

import styles from '@/styles/articulos.module.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import React from 'react'
import Slider from 'react-slick'

export default function CarruselCriticas ({ criticas }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }
  return (
    <Slider {...settings} className={styles.seccion}>
      {criticas.map(critica => (
        <article key={critica.id}>
          <h3 className={styles.title}>{critica.autor}</h3>
          <div className={styles.completo}>
            <div className={styles.fecha}>{critica.fecha}</div>
            <div className={styles.texto}>{critica.texto}</div>
          </div>
        </article>
      ))}
    </Slider>
  )
}
