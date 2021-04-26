import { useEffect } from 'react'

const useScreenLeaving = action => {
  useEffect(() => {
    window.addEventListener('beforeunload', action())
    return () => {
      window.removeEventListener('beforeunload', action())
    }
  }, [action])
}
export { useScreenLeaving }
