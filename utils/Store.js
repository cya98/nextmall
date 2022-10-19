import { createContext, useReducer } from 'react'

export const Store = createContext() // 스토어라는 객체를 만듬 createContext를 이용해서

const initialState = {
  cart: { cartItems: [] },
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

      return { ...state, cart: { ...state.cart, cartItems } }
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
