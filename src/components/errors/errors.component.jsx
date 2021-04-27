import React from 'react'
import { ShokedPikachu } from '../../assets'
import { GoHomeButton } from '../../components'
import './errors.style.css'

const Errors = () => {
  return (
    <div className='errors'>
      <span>Ops! Algo deu errado</span>
      <img alt='pikachu' src={ShokedPikachu}></img>
      <GoHomeButton />
    </div>
  )
}

export { Errors }
