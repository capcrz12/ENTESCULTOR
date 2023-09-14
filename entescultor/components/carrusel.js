'use client'

import React, { useEffect, useState } from 'react'
import { RViewer, RViewerTrigger } from 'react-viewerjs'
import styles from '@/styles/carrusel.module.css'

export default function Carrusel ({ obras }) {
  let urls = []

  useEffect(() => {
    obras.map(obra => {
      obra.images.map(image => {
        urls.push (`http://localhost:3001${image}`)
      })
    })
  }, [])

  const options = {
    interval: 3000,
    toolbar: {
      prev: true,
      next: true,
      play: true,
      rotateLeft: false,
      rotateRight: false,
      flipHorizontal: false,
      flipVertical: false,
      oneToOne: false
    },
    shown () {
      this.viewer.play(true)
    }
  }

  return (
    <div className={styles.carrusel}>
      <RViewer options={options} imageUrls={urls} >
        <RViewerTrigger>
          <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48' fill='none' className={styles.play}>
            <circle cx='24' cy='24' r='23' stroke='white' strokeWidth='2' />
            <path fillRule='evenodd' clipRule='evenodd' d='M20.2274 17.2007C20.1296 17.1349 20.0001 17.1247 19.8918 17.1754C19.7838 17.2261 19.7156 17.3289 19.7156 17.4413V30.5595C19.7156 30.6719 19.7838 30.7748 19.8918 30.8254C19.9374 30.8469 19.9876 30.8576 20.0371 30.8576C20.1042 30.8576 20.1711 30.8383 20.2274 30.8001L29.8702 24.241C29.9528 24.1847 30.0014 24.0952 30.0014 24.0004C30.0014 23.9056 29.9528 23.8162 29.8702 23.7598L20.2274 17.2007Z' stroke='white' strokeWidth='2' />
          </svg>
        </RViewerTrigger>
      </RViewer>
    </div>
  )
}
