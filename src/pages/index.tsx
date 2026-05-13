import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <Head>
        <title>Praktikum Next.js Pages Router</title>
      </Head>
      <h1>Praktikum Next.js Pages Router</h1> <br />
      <p className="text-gray-600">
        Mari belajar bersama untuk memahami konsep routing pada Next.js dengan menggunakan Pages Router. 
        Dalam praktikum ini, kita akan membuat beberapa halaman dan menghubungkannya menggunakan fitur routing yang disediakan oleh Next.js. 
        Kita akan mempelajari cara membuat halaman statis, dinamis, dan bagaimana mengelola navigasi antar halaman dengan mudah. Selamat belajar!
      </p><br />
      <p>Mahasiswa D4 Pengembangan Web</p>
        <img src="/nextjs.png" alt="Next.js" className={styles.error__image} />
    </div>
  )
}