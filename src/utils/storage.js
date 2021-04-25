export const setItemToLocalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export const getItemFromLocalStorage = key => {
  const value = window.localStorage.getItem(key)

  if (value) {
    return JSON.parse(value)
  }
}

export const removeItemFromLocalStorage = key => {
  window.localStorage.removeItem(key)
}
