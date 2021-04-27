import { useState } from 'react'
import { PokemonService } from '../../services'

const usePokemon = () => {
  const [service] = useState(new PokemonService())
  const [errors, setErrors] = useState([])

  return {
    errors,
    setErrors,
    loadPagePokemons: async pokemonType => {
      try {
        return await service.loadPagePokemons(pokemonType)
      } catch (e) {
        errors[0] = e
        setErrors([...errors])
      }
    }
  }
}

export { usePokemon }
