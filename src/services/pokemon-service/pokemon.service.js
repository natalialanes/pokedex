import axios from 'axios'
import { PokemonModel } from '../../models'
import { setItemToLocalStorage } from '../../utils/storage'

const baseUrl = 'https://pokeapi.co/api/v2/'

class PokemonService {
  async getAllPokemons () {
    const { data } = await axios.get(
      `${baseUrl}pokemon?limit=${100}&offset=${0}`
    )
    return data.results
  }

  async getPokemonInformation (pokemon) {
    const { data } = await axios.get(pokemon.url)
    return data
  }

  async getAllPokemonTypes () {
    const { data } = await axios.get(`${baseUrl}type`)
    return data
  }

  async getPokemonsByType (url) {
    const { data } = await axios.get(url)
    return data.pokemon
  }

  async loadPagePokemons (pokemonType) {
    const typesUrls = await this.getAllPokemonTypes()
    const currentTypeInformation = typesUrls.results.find(type => {
      return type.name === pokemonType
    })

    const allCurrentTypePokemons = await this.getPokemonsByType(
      currentTypeInformation.url
    )
    const allPokemonsInformation = await Promise.all(
      allCurrentTypePokemons.map(async (pokemonType, key) => {
        return await this.getPokemonInformation(pokemonType.pokemon)
      })
    )

    const allPokemons = allPokemonsInformation.map(pokemon => {
      return new PokemonModel({
        ...pokemon
      })
    })
    const currrentPagePokemons = allPokemonsInformation
      .slice(0, 10)
      .map(pokemon => {
        return new PokemonModel({
          ...pokemon
        })
      })

    setItemToLocalStorage('allPokemons', currrentPagePokemons)
    return allPokemons
  }
}

export { PokemonService }
