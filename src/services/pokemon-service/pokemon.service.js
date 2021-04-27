import axios from 'axios'
import { PokemonModel } from '../../models/pokemon-model/pokemon.model'
import { setItemToLocalStorage } from '../../utils/storage'
import handleException from '../exceptions/handle-exception'

const baseUrl = 'https://pokeapi.co/api/v2/'

class PokemonService {
  async getPokemonInformation (pokemon) {
    try {
      const { data } = await axios.get(pokemon.url)
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
    let currentTypeInformation
    let allCurrentTypePokemons
    let allPokemonsInformation

    try {
      const typesUrls = await this.getAllPokemonTypes()
      currentTypeInformation = typesUrls.results.find(type => {
        return type.name === pokemonType
      })
    } catch (error) {
      handleException(error)
    }

    try {
      allCurrentTypePokemons = await this.getPokemonsByType(
        currentTypeInformation.url
      )
    } catch (error) {
      handleException(error)
    }

    try {
      allPokemonsInformation = await Promise.all(
        allCurrentTypePokemons.map(async (pokemonType, key) => {
          return await this.getPokemonInformation(pokemonType.pokemon)
        })
      )
    } catch (error) {
      handleException(error)
    }

    if (!allPokemonsInformation)
      throw new Error('Erro ao carregar Pokemóns da api')

    const allPokemons = allPokemonsInformation.length
      ? allPokemonsInformation.map(pokemon => {
          return new PokemonModel({
            ...pokemon
          })
        })
      : []
    const currrentPagePokemons = allPokemonsInformation.length
      ? allPokemonsInformation.slice(0, 10).map(pokemon => {
          return new PokemonModel({
            ...pokemon
          })
        })
      : []

    setItemToLocalStorage('allPokemons', currrentPagePokemons)
    return allPokemons
  }
}

export { PokemonService }
