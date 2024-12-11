'use client'

import React from 'react'
import ReactPlayer from 'react-player'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import { RViewer, RViewerTrigger } from 'react-viewerjs'
import styles from '@/styles/eventos.module.css'
import Link from 'next/link'

export default function PlayerEventos ({ eventos }) {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  const options = {
    toolbar: {
      prev: false,
      next: false,
      play: false,
      rotateLeft: false,
      rotateRight: false,
      flipHorizontal: false,
      flipVertical: false,
      oneToOne: false
    }
  }

  return (
    <Slider {...settings} className={styles.seccion}>
      {eventos.map(evento => (
        <article key={evento.id}>
          <h3 className={styles.title}>{evento.title}</h3>
          <div className={styles.completo}>
            <p className={styles.fecha}>{evento.fecha}</p>
            <p className={styles.nota}>{evento.nota}</p>
            { evento.enlace !== undefined & evento.enlace !== '' ? <Link href={evento.enlace} target='_blank' className={styles.fecha}>{evento.enlace}</Link> : ''}
            <div className={styles.divVideo}>
              {evento.url !== '' ? <ReactPlayer url={evento.url} className={styles.video} width='1280' height='1720' /> : ''}
            </div>
            { evento.images.length !== 0 ? 
              <div className={styles.imagenes}>
                <Slider {...settings} className={styles.carrusel}>
                  {evento.images.map (image => (
                    <div key={image}>
                      <RViewer options={options} imageUrls={`${image}`}>
                        <RViewerTrigger >
                          <img alt='No disponible' src={`${image}`} className={styles.image} />
                        </RViewerTrigger>
                      </RViewer>
                    </div>
                  ))}
                </Slider>
              </div> 
              : ''
            }
          </div>
        </article>
      ))}
    </Slider>
  )
}
