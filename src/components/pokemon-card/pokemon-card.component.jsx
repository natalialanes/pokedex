import React, { useState } from 'react'
import { CardBackgroundPokeball } from '../../assets'
import { useCart } from '../../hooks'
import './pokemon-card.style.css'

const PokemonCard = ({ pokemon, colors }) => {
  const [footerOption, setFooterOption] = useState(0)
  const { onAddToCart } = useCart()

  const footerContent = [
    pokemon.abilities.slice(0, 7).map((ability, key) => {
      return <div key={key}>{ability.ability.name}</div>
    }),
    pokemon.types.slice(0, 7).map((type, key) => {
      return <div key={key}>{type}</div>
    }),
    pokemon.moves.slice(0, 7).map((move, key) => {
      return <div key={key}>{move.move.name}</div>
    })
  ]

  const footerTitle = ['Habilidades', 'Categorias', 'Movimentos']

  const chooseFooterContent = () => {
    return <div className='sub-menu-option'>{footerContent[footerOption]}</div>
  }

  return (
    <div className='card' style={{ background: colors.card.background }}>
      <div className='card-header' style={{ color: colors.text }}>
        <div className='card-container'>
          <div className='header-information'>
            <div>{pokemon.name}</div>
            <div className='price'>R$ {pokemon.price}</div>
          </div>
          <div className='add-to-card' onClick={() => onAddToCart(pokemon)}>
            <span className='add-to-card-span'>Adicionar ao carrinho</span>
          </div>
          <img alt='pokemon' className='pokemon-image' src={pokemon.image} />
        </div>
        <div className='pokeball'>
          <img alt='pokeball' src={CardBackgroundPokeball} />
        </div>
      </div>
      <div className='card-footer'>
        <div className='footer-options' style={{ color: colors.button.text }}>
          {footerTitle.map((option, key) => {
            return (
              <div
                className={key === footerOption ? 'selected-option' : 'option'}
                key={key}
                onClick={() => setFooterOption(key)}
              >
                {option}
              </div>
            )
          })}
        </div>
        {chooseFooterContent()}
      </div>
    </div>
  )
}

export { PokemonCard }
