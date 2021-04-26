import { useParams } from 'react-router'
import * as themes from '../../theme/schema.json'

export const useTheme = () => {
  let { pokemonType } = useParams()

  const themeMapper = {
    fire: themes.data.fire,
    water: themes.data.water,
    grass: themes.data.grass,
    electric: themes.data.electric
  }

  return { theme: themeMapper[pokemonType] }
}
