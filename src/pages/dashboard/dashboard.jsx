import React from 'react'
import { useHistory } from 'react-router-dom'
import {
  DashBulbassaur,
  DashCharmander,
  DashPikachu,
  DashSquirtle
} from '../../assets'
import './dashboard.style.css'

const Dashboard = () => {
  const history = useHistory()
  function handleRedirect (route) {
    history.push(`/home/${route}`)
  }

  const pokemonTypes = [
    { electric: 'Elétrico', image: DashPikachu, alt: 'pikachu' },
    { fire: 'Fogo', image: DashCharmander, alt: 'charmander' },
    { grass: 'Grama', image: DashBulbassaur, alt: 'bulbassaur' },
    { water: 'Água', image: DashSquirtle, alt: 'squirtle' }
  ]

  const renderPokemonOptions = () => {
    return pokemonTypes.map((type, key) => {
      return (
        <div
          className={Object.keys(type)[0]}
          onClick={() => handleRedirect(Object.keys(type)[0])}
        >
          <img
            className='dash-image'
            src={Object.values(type)[1]}
            alt={Object.values(type)[key]}
          />
          <div className='type'>{Object.values(type)[0]}</div>
        </div>
      )
    })
  }

  return (
    <div className='dashboard'>
      <div className='pokemon-options'>{renderPokemonOptions()}</div>
    </div>
  )
}

export { Dashboard }
