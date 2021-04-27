import React from 'react'
import { Link } from 'react-router-dom'
import './go-home-button.style.css'

const GoHomeButton = () => {
  return (
    <Link to='/'>
      <button className='redirect-to-home-page'>
        Voltar para a página inicial
      </button>
    </Link>
  )
}

export { GoHomeButton }
