export class PokemonModel {
  constructor ({
    name,
    abilities,
    weight,
    height,
    base_experience,
    sprites,
    moves,
    types
  }) {
    this.name = name
    this.abilities = abilities
    this.weight = weight
    this.height = height
    this.price = base_experience
    this.image = sprites.other['official-artwork'].front_default
    this.moves = moves
    this.types = types.map(type => type.type.name)
  }
}
