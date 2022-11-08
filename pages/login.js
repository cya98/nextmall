import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import Layout from '../components/Layout'
import { getError } from '../utils/erorr'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function LoginScreen() {
  const { data: session } = useSession()
  const router = useRouter()
  const { redirect } = router.query // 지불 버튼 눌렀더니 로그인 했냐 로그인 성공하면 바로 카트페이지로 감
  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/') //카트페이지로 가거나 루트페이지로가거나
    }
  }, [router, session, redirect]) //세션이 바뀌면

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })
      if (result.error) {
        toast.error(result.error)
      }
    } catch (err) {
      toast.error(getError(err))
    }
  }

  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="text-xl mb-4">Login</h1>

        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'Please enter password',
              minLength: {
                value: 3,
                message: '패스워드를 3자 이상으로 입력하세요.',
              },
            })}
            className="w-full"
            id="password"
            autoFocus
          ></input>
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>

        <div className="mb-4">
          <button className="primary-button" type="submit">
            Login
          </button>
        </div>

        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please enter valid email',
              },
            })}
            className="w-full"
            id="email"
            autoFocus
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>

        <div className="mb-4">
          계정이 없으면 등록하세요...<Link href="register">Register</Link>
        </div>
      </form>
    </Layout>
  )
}
