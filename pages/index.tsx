import Head from 'next/head'
import Navbar from './components/Navbar'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import { useStore } from '@/store/store'

export default function Home() {
  
  const accessToken = useStore(store => store.accessToken)

  return (
    <>
      <Head>
        <title>Flashpoll</title>
        <meta name="description" content="Voting app. Simple.Fast.Secure" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/flashpoll.ico" />
      </Head>
      <main className="bg-dark min-h-screen">
        <Navbar />
        <div className="text-center py-20">
          <h2 className="text-white mx-auto font-bold text-6xl" style={{maxWidth:"900px"}}>Create <span className="text-yellow">Instant Realtime</span> Polls For Free</h2>
          <Link href={accessToken ? "/create" : "/login"}>
            <Button className="mt-10" colorScheme='yellow' size='lg'>Create a Poll {">>"}</Button>
          </Link>
        </div>
      </main>
    </>
  )
}
