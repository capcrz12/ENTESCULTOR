'use client'

import React, { useEffect } from 'react'
import { RViewer, RViewerTrigger } from 'react-viewerjs'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import styles from '@/styles/obras.module.css'

export default function AmpliarImagen ({ obra }) {

  const settings = {
    dots: true,
    infinite: false,
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
    <Slider {...settings} className={styles.carrusel}>
      {obra.images.map(image => (
        <div key={image}>
          <RViewer options={options} imageUrls={`http://localhost:3001${image}`}>
            <RViewerTrigger >
              <img alt='No disponible' src={`http://localhost:3001${image}`} className={styles.image} />
            </RViewerTrigger>
          </RViewer>
        </div>
      ))}
    </Slider>
  )
}
