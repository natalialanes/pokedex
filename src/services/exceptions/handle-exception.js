import { EXCEPTION } from './exceptions'

const error = () => {
  throw new Error(error.response || EXCEPTION.API_EXCEPTION)
}

export default error
