import { useState } from 'react'
import { PokemonService } from '../../services'

const usePokemon = () => {
  const [service] = useState(new PokemonService())

  return {
    loadPagePokemons: async pokemonType => {
      return await service.loadPagePokemons(pokemonType)
    }
  }
}

export { usePokemon }
