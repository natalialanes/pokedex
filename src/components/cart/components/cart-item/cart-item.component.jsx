import React from 'react'
import { useCart } from '../../../../hooks'
import './cart-item.style.css'

const CartItem = ({ pokemon }) => {
  const { onAddToCart, onDecreaseAmount, onRemoveItem } = useCart()
  return (
    <div className='cart-pokemon'>
      <div className='pokemon-wrapper'>
        <img className='cart-pokemon-image' alt='pokemon' src={pokemon.image} />
        <div className='pokemon-information'>
          <div className='pokemon-name'>{pokemon.name}</div>
          <div className='pokemon-price'>R$ {pokemon.price}</div>
        </div>
      </div>
      <div className='change-amount-wrapper'>
        <div
          className='change-amount'
          onClick={() => onDecreaseAmount(pokemon)}
        >
          -
        </div>
        <div className='current-amount'>{pokemon.amount}</div>
        <div className='change-amount' onClick={() => onAddToCart(pokemon)}>
          +
        </div>
      </div>
      <div className='remove-pokemon' onClick={() => onRemoveItem(pokemon)}>
        x
      </div>
    </div>
  )
}

export { CartItem }
