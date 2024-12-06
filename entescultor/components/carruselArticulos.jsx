'use client'

import Link from 'next/link'
import styles from '@/styles/articulos.module.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import React from 'react'
import Slider from 'react-slick'
import { RViewer, RViewerTrigger } from 'react-viewerjs'

export default function CarruselArticulos ({ articulos }) {
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
      {articulos.map(articulo => (
        <article key={articulo.id} className={styles.completo}>
          <h3 className={styles.title}>{articulo.title}</h3>
          <div className={styles.fecha}>{articulo.fecha}</div>
          <div className={styles.texto}>{articulo.texto}</div>
          <div className={styles.div_image}>
            {
              articulo.image !== ''
                ?
                <RViewer options={options} imageUrls={`${process.env.NEXT_PUBLIC_API_URL}${articulo.image}`}>
                  <RViewerTrigger>
                    <img alt='No disponible' src={`${process.env.NEXT_PUBLIC_API_URL}${articulo.image}`} className={styles.image} />
                  </RViewerTrigger>
                </RViewer>
                : ''
            }
          </div>
          <Link className={styles.enlace} href={articulo.url} target='_blank'>- Enlace al artículo -</Link>
        </article>
      ))}
    </Slider>
  )
}
