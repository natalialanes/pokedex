import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { ThemeProvider } from 'styled-components'
import { ShokedPikachu } from '../../assets'
import {
  Cart,
  Errors,
  Header,
  Modal,
  Pagination,
  PokemonCard
} from '../../components'
import { useCart, usePokemon, useTheme } from '../../hooks'
import { GlobalStyles } from '../../theme/global-styles'
import { NotFound } from '../not-found/not-found'
import './home-style.css'

const HomePage = () => {
  let { pokemonType } = useParams()
  const [allPokemons, setAllPokemons] = useState([])
  const [currentPagePokemons, setCurrentPagePokemons] = useState([])
  const [filteredPokemons, setFilteredPokemons] = useState([])
  const [selectedPage, setSelectedPage] = useState(1)
  const { theme } = useTheme()
  const { errors, loadPagePokemons } = usePokemon()
  const { cartPokemons } = useCart()
  const [noPokemonFounded, setNoPokemonFounded] = useState(false)

  const pokemonTypes = ['electric', 'fire', 'grass', 'water']

  useEffect(() => {
    if (pokemonTypes.includes(pokemonType)) loadPokemons()
  }, [])

  useEffect(() => {
    !errors.length > 0 && onPageChange(0)
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
  }

  const searchPokemon = value => {
    const pokemons = allPokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(value.toLowerCase())
    )
    setNoPokemonFounded(!pokemons.length)
    setFilteredPokemons(pokemons)
  }

  const render = () => {
    if (errors.length) return <Errors />
    if (!pokemonTypes.includes(pokemonType)) return <NotFound />
    return theme && currentPagePokemons.length ? (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <div className='page-container'>
          <Modal colors={theme.colors} />
          <Header colors={theme.colors} onSearch={searchPokemon} />
          <div className='cart-wrapper'>
            <Cart
              pokemons={cartPokemons}
              color={theme.colors.card.background}
            />
          </div>
          <div className='pokemons-wrapper'>
            {noPokemonFounded ? (
              <div className='no-pokemon-founded'>
                <span>Ops! Não encontramos nenhum pokemon para sua busca</span>
                <img alt='pikachu' src={ShokedPikachu} />
              </div>
            ) : (
              currentPagePokemons.map((pokemon, key) => {
                return (
                  <div className='pokemon-card' key={key}>
                    <PokemonCard
                      colors={theme.colors}
                      pokemon={pokemon}
                      key={key}
                    ></PokemonCard>
                  </div>
                )
              })
            )}
          </div>
          <Pagination
            colors={theme.colors}
            pageNumbers={Math.ceil(filteredPokemons.length / 10)}
            selectedNumber={selectedPage}
            onPageSelection={pageNumber => onPageChange(pageNumber)}
          />
        </div>
      </ThemeProvider>
    ) : (
      <></>
    )
  }
  return render()
}

export { HomePage }
