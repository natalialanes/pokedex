import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  setItemToLocalStorage
} from '../storage'

jest.spyOn(window.localStorage.__proto__, 'setItem')
window.localStorage.__proto__.setItem = jest.fn()

jest.spyOn(window.localStorage.__proto__, 'getItem')
window.localStorage.__proto__.getItem = jest.fn()

jest.spyOn(window.localStorage.__proto__, 'removeItem')
window.localStorage.__proto__.getItem = jest.fn()

describe('Call setItemToLocalStorage on utils', () => {
  const cart = [{ pokemon: { name: 'bulbassaur', height: 30, weight: 100 } }]
  it('should call window.localStorage.setItem', () => {
    setItemToLocalStorage('cart', cart)
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart',
      JSON.stringify(cart)
    )
  })
})

describe('Call getItemToLocalStorage on utils', () => {
  it('should call window.localStorage.getItem', () => {
    getItemFromLocalStorage('cart')
    expect(localStorage.getItem).toHaveBeenCalledWith('cart')
  })
})

describe('Call removeItemToLocalStorage on utils', () => {
  it('should call window.localStorage.removeItem', () => {
    removeItemFromLocalStorage('cart')
    expect(localStorage.removeItem).toHaveBeenCalledWith('cart')
  })
})
