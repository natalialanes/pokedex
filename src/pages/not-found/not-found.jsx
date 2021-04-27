import React from 'react'
import { ShokedPikachu } from '../../assets'
import { GoHomeButton } from '../../components'
import './not-found.style.css'

const NotFound = () => {
  return (
    <div className='not-found'>
      <span className='title'>Ops! Não encontramos essa url</span>
      <img alt='pikachu' src={ShokedPikachu} />
      <GoHomeButton />
    </div>
  )
}

export { NotFound }
