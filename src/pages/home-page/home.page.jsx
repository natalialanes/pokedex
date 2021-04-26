import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { ThemeProvider } from 'styled-components'
import { Cart, Header, Modal, Pagination, PokemonCard } from '../../components'
import { useCart, usePokemon, useTheme } from '../../hooks'
import { GlobalStyles } from '../../theme/global-styles'
import { getItemFromLocalStorage } from '../../utils/storage'
import { NotFound } from '../not-found/not-found'
import './home-style.css'

const HomePage = () => {
  let { pokemonType } = useParams()
  const [allPokemons, setAllPokemons] = useState([])
  const [currentPagePokemons, setCurrentPagePokemons] = useState([])
  const [filteredPokemons, setFilteredPokemons] = useState([])
  const [selectedPage, setSelectedPage] = useState(1)
  const { theme } = useTheme()
  const { loadPagePokemons } = usePokemon()
  const { cartPokemons } = useCart()

  const pokemonTypes = ['electric', 'fire', 'grass', 'water']

  useEffect(() => {
    if (pokemonTypes.includes(pokemonType)) loadPokemons()
  }, [])

  useEffect(() => {
    onPageChange(0)
  }, [filteredPokemons])

  const onPageChange = pageNumber => {
    let lastPokemonIndex = pageNumber * 10 + 10
    setSelectedPage(pageNumber + 1)
    setCurrentPagePokemons(
      filteredPokemons.slice(
        pageNumber * 10,
        lastPokemonIndex > filteredPokemons.length
          ? filteredPokemons.length
          : lastPokemonIndex
      )
    )
    window.scrollTo(0, 0)
  }

  const loadPokemons = async () => {
    const allPokemons = await loadPagePokemons(pokemonType)
    setAllPokemons(allPokemons)
    setFilteredPokemons(allPokemons)
    setCurrentPagePokemons(getItemFromLocalStorage('allPokemons'))
  }

  const searchPokemon = value => {
    const pokemons = allPokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredPokemons(pokemons)
  }

  const render = () => {
    if (!pokemonTypes.includes(pokemonType)) {
      return <NotFound />
    }
    return (
      theme && (
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <div className='page-container'>
            <Modal colors={theme.colors} />
            <div>
              <Header colors={theme.colors} onSearch={searchPokemon} />
              <div className='cart-wrapper'>
                <Cart
                  pokemons={cartPokemons}
                  color={theme.colors.card.background}
                />
              </div>
              <div className='pokemons-wrapper'>
                {currentPagePokemons.map((pokemon, key) => {
                  return (
                    <div className='pokemon-card' key={key}>
                      <PokemonCard
                        colors={theme.colors}
                        pokemon={pokemon}
                        key={key}
                      ></PokemonCard>
                    </div>
                  )
                })}
              </div>
            </div>
            <Pagination
              pageNumbers={Math.ceil(filteredPokemons.length / 10)}
              selectedNumber={selectedPage}
              onPageSelection={pageNumber => onPageChange(pageNumber)}
            />
          </div>
        </ThemeProvider>
      )
    )
  }
  return render()
}

export { HomePage }
