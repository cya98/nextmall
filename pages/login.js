import Link from 'next/link'
import React from 'react'
import Layout from '../components/Layout'

export default function () {
  return (
    <Layout title="Login">
      <form className="mx-auto max-w-screen-md">
        <h1 className="text-xl mb-4">Login</h1>

        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="w-full"
            id="password"
            autoFocus
          ></input>
        </div>

        <div className="mb-4">
          <button className="primary-button" type="submit">
            Login
          </button>
        </div>

        <div className="mb-4">
          계정이 없으면 등록하세요...<Link href="register">Register</Link>
        </div>
      </form>
    </Layout>
  )
}
