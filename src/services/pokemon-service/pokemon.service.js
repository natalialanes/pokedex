import axios from 'axios'
import { PokemonModel } from '../../models'
import { setItemToLocalStorage } from '../../utils/storage'

const baseUrl = 'https://pokeapi.co/api/v2/'

class PokemonService {
  async getAllPokemons () {
    try {
      const { data } = await axios.get(
        `${baseUrl}pokemon?limit=${100}&offset=${0}`
      )
      return data.results
    } catch (error) {
      console.log(error)
    }
  }

  async getPokemonInformation (pokemon) {
    try {
      const { data } = await axios.get(pokemon.url)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async getAllPokemonTypes () {
    try {
      const { data } = await axios.get(`${baseUrl}type`)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async getPokemonsByType (url) {
    try {
      const { data } = await axios.get(url)
      return data.pokemon
    } catch (error) {
      console.log(error)
    }
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
