import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Layout title="Home">
      <div className={styles.container}>
        <div className="">
          <h1 className="text-4xl font-bold">NextMall wiht Tailwind CSS</h1>
          <p> 웹서버프로그래밍 정찬하</p>
        </div>
      </div>
    </Layout>
  )
}
