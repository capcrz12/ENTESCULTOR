'use client'

import styles from '@/styles/criticas.module.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import React from 'react'
import Slider from 'react-slick'
import { RViewer, RViewerTrigger } from 'react-viewerjs'

export default function CarruselCriticas ({ criticas }) {
  const settings = {
    dots: true,
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
      {criticas.map(critica => (
        <article key={critica.id}>
          <h3 className={styles.title}>{critica.autor}</h3>
          <div className={styles.completo}>
            <div className={styles.fecha}>{critica.fecha}</div>
            <div className={styles.texto}>{critica.texto}</div>
            { critica.images.length !== 0 ? 
                <div className={styles.imagenes}>
                  <Slider {...settings} className={styles.carrusel}>
                    {critica.images.map (image => (
                      <div key={image}>
                        <RViewer options={options} imageUrls={`http://localhost:3001${image}`}>
                          <RViewerTrigger >
                            <img alt='No disponible' src={`http://localhost:3001${image}`} className={styles.image} />
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
