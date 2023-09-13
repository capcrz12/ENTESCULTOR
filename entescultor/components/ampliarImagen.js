'use client'

import React from 'react'
import { RViewer, RViewerTrigger } from 'react-viewerjs'
import styles from '@/styles/obras.module.css'

export default function AmpliarImagen ({ children, src }) {
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
    <div>
      <RViewer options={options} imageUrls={`http://localhost:3001${src.url}`}>
        <RViewerTrigger>
          <img alt='No disponible' src={`http://localhost:3001${src.url}`} className={styles.image} />
        </RViewerTrigger>
      </RViewer>
    </div>
  )
}
