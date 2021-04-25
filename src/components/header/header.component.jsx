import React from 'react'
import { CgShoppingCart } from 'react-icons/cg'
import { Link } from 'react-router-dom'
import { PokemonLogo } from '../../assets/'
import { useCart } from '../../hooks'
import { SearchBar } from '../search-bar/search-bar.component'
import './header.style.css'

const Header = ({ onSearch, colors }) => {
  const { toggleCart } = useCart()
  return (
    <div className='header' style={{ background: colors.card.background }}>
      <Link to='/'>
        <img className='logo' alt='' src={PokemonLogo} />
      </Link>
      <SearchBar onSearch={onSearch} />
      <div className='cart-icon'>
        <CgShoppingCart
          size={30}
          onClick={toggleCart}
          style={{ color: colors.text }}
        />
      </div>
    </div>
  )
}

export { Header }
