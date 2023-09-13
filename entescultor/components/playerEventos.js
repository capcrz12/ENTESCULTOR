'use client'

import React from 'react'
import ReactPlayer from 'react-player'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import styles from '@/styles/eventos.module.css'

export default function PlayerEventos ({ eventos }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  return (
    <Slider {...settings} className={styles.seccion}>
      {eventos.map(evento => (
        <article key={evento.id}>
          <h3 className={styles.title}>{evento.title}</h3>
          <div className={styles.completo}>
            <p className={styles.fecha}>{evento.fecha}</p>
            <p className={styles.nota}>{evento.nota}</p>
            <ReactPlayer url={evento.url} className={styles.video} width='1280' height='1720' />
          </div>
        </article>
      ))}
    </Slider>
  )
}
