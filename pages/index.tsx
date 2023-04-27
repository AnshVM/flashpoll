import Head from 'next/head'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import { useStore } from '@/store/store'

export default function Home() {


  return (
    <>
      <Head>
        <title>Flashpoll</title>
        <meta name="description" content="Voting app. Simple.Fast.Secure" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/flashpoll.ico" />
      </Head>
      <main>
        <h1 className='text-3xl font-bold text-center mt-10'>Welcome to Flashpoll ⚡</h1>
        <Link href="/create"><Button colorScheme='yellow'>Create Poll</Button></Link> 
      </main>
    </>
  )
}
