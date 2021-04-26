import React from 'react'
import { Link } from 'react-router-dom'
import { ShokedPikachu } from '../../assets'
import './not-found.style.css'

const NotFound = () => {
  return (
    <div className='not-found'>
      <span className='title'>Ops! Não encontramos essa url</span>
      <img alt='pikachu' src={ShokedPikachu} />
      <Link to='/'>
        <button className='redirect-to-home-page'>
          Voltar para a página inicial
        </button>
      </Link>
    </div>
  )
}

export { NotFound }
