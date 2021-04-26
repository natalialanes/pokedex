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
    { water: 'Aquático', image: DashSquirtle, alt: 'squirtle' }
  ]

  const renderPokemonOptions = () => {
    return pokemonTypes.map((type, key) => {
      const pokemonKeyProperties = Object.keys(type)
      const pokemonValueProperties = Object.values(type)
      return (
        <div
          className={pokemonKeyProperties[0]}
          onClick={() => handleRedirect(pokemonKeyProperties[0])}
          key={key}
        >
          <img
            className='dash-image'
            src={pokemonValueProperties[1]}
            alt={pokemonValueProperties[key]}
          />
          <div className='type'>{pokemonValueProperties[0]}</div>
        </div>
      )
    })
  }

  return <div className='pokemon-options'>{renderPokemonOptions()}</div>
}

export { Dashboard }
