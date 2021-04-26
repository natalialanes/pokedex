import createGlobalState from 'react-create-global-state'
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  setItemToLocalStorage
} from '../../utils/storage'
import { useScreenLeaving } from '../use-screen-leaving/use-screen-leaving.hook'

const [
  useGlobalCartInformation,
  GlobalCartInformationProvider
] = createGlobalState({
  isCartVisible: false,
  cartPokemons: getItemFromLocalStorage('cart') || []
})

const useCart = () => {
  const [
    { cartPokemons, isCartVisible },
    setCartInformation
  ] = useGlobalCartInformation()
  useScreenLeaving(e => {
    setItemToLocalStorage('cart', cartPokemons)
    return null
  })
  return {
    onAddToCart: pokemon => {
      const pokemonInCart =
        cartPokemons.find(p => p.name === pokemon.name) || pokemon

      const addedPokemon = {
        ...pokemonInCart,
        amount: (pokemonInCart.amount || 0) + 1,
        addedAt: pokemonInCart.addedAt || +new Date()
      }

      setCartInformation({
        isCartVisible: true,
        cartPokemons: [
          ...cartPokemons.filter(
            pokemon => pokemon.name !== pokemonInCart.name
          ),
          addedPokemon
        ]
      })
    },
    onRemoveItem: selectedPokemon => {
      const isLastItem = cartPokemons.length === 1
      const newPokemons = cartPokemons.filter(
        pokemon => pokemon.name !== selectedPokemon.name
      )
      setCartInformation({
        isCartVisible: isLastItem ? false : isCartVisible,
        cartPokemons: newPokemons
      })
    },
    onDecreaseAmount: pokemon => {
      if (pokemon.amount === 0) return

      const pokemonToUpdate = {
        ...pokemon,
        amount: pokemon.amount - 1
      }
      setCartInformation({
        isCartVisible: isCartVisible,
        cartPokemons: [
          ...cartPokemons.filter(
            cartPokemon => cartPokemon.name !== pokemon.name
          ),
          pokemonToUpdate
        ]
      })
    },
    onPurchaseFinish: () => {
      setCartInformation({
        isCartVisible: false,
        cartPokemons: []
      })
      removeItemFromLocalStorage('cart')
    },
    toggleCart: () => {
      setCartInformation({
        cartPokemons,
        isCartVisible: !isCartVisible
      })
    },
    cartPokemons,
    isCartVisible
  }
}

export { useCart, GlobalCartInformationProvider }
