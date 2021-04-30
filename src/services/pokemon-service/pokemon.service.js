import axios from 'axios'
import { PokemonModel } from '../../models'
import handleException from '../exceptions/handle-exception'

const baseUrl = 'https://pokeapi.co/api/v2/'

class PokemonService {
  async getPokemonInformation (pokemonUrl) {
    try {
      const { data } = await axios.get(pokemonUrl)
      return data
    } catch (error) {
      handleException(error)
    }
  }

  async getAllPokemonTypes () {
    try {
      const { data } = await axios.get(`${baseUrl}type`)
      return data
    } catch (error) {
      handleException(error)
    }
  }

  async getPokemonsByType (url) {
    try {
      const { data } = await axios.get(url)
      return data.pokemon
    } catch (error) {
      handleException(error)
    }
  }

  async loadPagePokemons (pokemonType) {
    let allPagePokemons

    const { results: allPokemonsInformation } = await this.getAllPokemonTypes()

    const allCurrentTypePokemons = await this.getPokemonsByType(
      allPokemonsInformation.find(pokemonInformation => {
        return pokemonInformation.name === pokemonType
      }).url
    )

    try {
      allPagePokemons = await Promise.all(
        allCurrentTypePokemons.map(async (pokemonType, key) => {
          return await this.getPokemonInformation(pokemonType.pokemon.url)
        })
      )
    } catch (error) {
      handleException(error)
    }

    if (!allPagePokemons) throw new Error('Erro ao carregar Pokemóns da api')

    return (
      allPagePokemons.map(pokemon => {
        return new PokemonModel({
          ...pokemon
        })
      }) || []
    )
  }
}

export { PokemonService }
