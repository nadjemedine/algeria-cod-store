'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../sanity.config'

export default function StudioLayout() {
  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh',
      margin: 0,
      padding: 0,
      overflow: 'hidden'
    }}>
      <NextStudio config={config} />
    </div>
  )
}