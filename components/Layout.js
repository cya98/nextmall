import Head from 'next/head'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../utils/Store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Menu } from '@headlessui/react'
import DropdownLink from './DropdownLink'
import Cookies from 'js-cookie'

export default function Layout({ title, children }) {
  const { state, dispatch } = useContext(Store)
  const { cart } = state
  const { status, data: session } = useSession()

  const [cartItemsCount, setCartItemsCount] = useState(0) //변수이름, 변수를 변경하는 함수이름
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0))
  }, [cart.cartItems])

  const logoutClickHandler = () => {
    Cookies.remove('cart')
    dispatch({ type: 'CART_RESET' })
    signOut({ callbackUrl: '/login' })
  }

  return (
    <div>
      <Head>
        <title>{title ? title + '- NextShop' : 'NextShop'}</title>
        <meta name="description" content="Nextjs Ecommerce" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex flex-col h-screen justify-between">
        <header>
          <nav className="flex justify-between items-center h-12 px-4 shadow-md">
            <Link href="/">
              <a className="text-lg font-bold">안뇽</a>
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
              {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-blue-600">
                    {session.user.name}
                  </Menu.Button>

                  <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white shadow-lg">
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/profile">
                        Profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/order-history"
                      >
                        Order History
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <a
                        className="dropdown-link"
                        href="#"
                        onClick={logoutClickHandler}
                      >
                        Logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/login">
                  <a className="p-2">Login</a>
                </Link>
              )}
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
