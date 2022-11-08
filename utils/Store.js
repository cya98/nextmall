import { createContext, useReducer } from 'react'
import Cookies from 'js-cookie'

export const Store = createContext() // 스토어라는 객체를 만듬 createContext를 이용해서

const initialState = {
  cart: Cookies.get('cart')
    ? JSON.parse(Cookies.get('cart'))
    : { cartItems: [] },
}

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const newItem = action.payload
      const existItem = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      )
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem]
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }))
      return { ...state, cart: { ...state.cart, cartItems } }
    } //쿠키는 스트링이라 stringify 로스트링으로 바꿔줌
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== action.payload.slug //삭제했다..
      )
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }))

      return { ...state, cart: { ...state.cart, cartItems } }
    }

    case 'CART_RESET':
      return {
        ...state,
        cart: {
          cartItems: [],
          shippingAddress: { location: {} },
          paymentMethod: '',
        },
      }
    default:
      return state
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch } //dispatch 행동하는 함수
  return <Store.Provider value={value}>{children}</Store.Provider>
}
