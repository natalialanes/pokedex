import React from 'react'
import { useCart, useModal, useTheme } from '../../hooks'
import './cart.style.css'
import { CartItem } from './components/cart-item/cart-item.component'

const Cart = () => {
  const { showSuccessModal } = useModal()
  const {
    cartPokemons,
    isCartVisible,
    onPurchaseFinish,
    toggleCart
  } = useCart()

  const currentCartValue = cartPokemons.reduce(
    (priceAccumulator, { price, amount }) => priceAccumulator + price * amount,
    0
  )
  const { theme } = useTheme()

  const renderTitle = () => {
    return cartPokemons.length
      ? 'Pokémons no seu carrinho'
      : 'Você ainda não adicionou nenhum pokemon no seu carrinho'
  }

  const onConfirmPurchase = () => {
    onPurchaseFinish()
    showSuccessModal({
      message: 'Obrigado por comprar Pokémons.',
      subtitle: 'Até a próxima compra!'
    })
  }

  const showPurchaseModal = () => {
    showSuccessModal({
      message: 'Deseja realmente efetivar a compra?',
      subtitle: `Valor total da compra: R$ ${currentCartValue}`,
      isConfirm: true,
      onConfirmClick: onConfirmPurchase
    })
  }

  return (
    <div className={isCartVisible ? 'open-cart ' : 'closed-cart'}>
      <div className='cart-close'>
        <span onClick={toggleCart}>x</span>
      </div>
      <span className='cart-title' style={{ color: theme.colors.cart.text }}>
        {renderTitle()}
      </span>
      <div className='inner'>
        {cartPokemons
          .sort((a, b) => a.addedAt - b.addedAt)
          .map((pokemon, key) => {
            return <CartItem key={key} pokemon={pokemon} />
          })}
        <div className='current-cart-value'>
          <div>Valor total no carrinho: </div>
          R$ {currentCartValue}
        </div>
        {cartPokemons.length ? (
          <button
            theme={theme}
            onClick={showPurchaseModal}
            disabled={currentCartValue === 0}
          >
            Finalizar Compra
          </button>
        ) : null}
      </div>
    </div>
  )
}

export { Cart }
