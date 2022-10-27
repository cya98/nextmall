import Head from 'next/head'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../utils/Store'

export default function Layout({ title, children }) {
  const { state } = useContext(Store)
  const { cart } = state

  const [cartItemsCount, setCartItemsCount] = useState(0) //변수이름, 변수를 변경하는 함수이름
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0))
  }, [cart.cartItems])
  return (
    <div>
      <Head>
        <title>{title ? title + '- NextShop' : 'NextShop'}</title>
        <meta name="description" content="Nextjs Ecommerce" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col h-screen justify-between">
        <header>
          <nav className="flex justify-between items-center h-12 px-4 shadow-md">
            <Link href="/">
              <a className="text-lg font-bold">NextShop</a>
            </Link>
            <div>
              <Link href="/cart">
                <a className="p-2">
                  Cart
                  {cartItemsCount > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cartItemsCount}
                    </span>
                  )}
                </a>
              </Link>

              <Link href="/login">
                <a className="p-2">Login</a>
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4"> {children} </main>

        <footer className="flex h-10 bg-red-200 justify-center items-center shadow-inner">
          <p> Copyright &copy; 2022, NextShop</p>
        </footer>
      </div>
    </div>
  )
}
