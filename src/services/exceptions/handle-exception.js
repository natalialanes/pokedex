import { EXCEPTION } from './exceptions'

export default error => {
  throw new Error(error.response || EXCEPTION.API_EXCEPTION)
}
