import Navbar from '../components/Navbar'
import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useStore } from '../store/store'

export default function Home() {
  
  const accessToken = useStore(store => store.accessToken)

  return (
    <>
      <main className="bg-dark min-h-screen">
        <Navbar />
        <div className="text-center py-20">
          <h2 className="text-white mx-auto font-bold text-6xl" style={{maxWidth:"900px"}}>Create <span className="text-yellow">Instant Realtime</span> Polls For Free</h2>
          <Link to={accessToken ? "/create" : "/login"}>
            <Button className="mt-10" colorScheme='yellow' size='lg'>Create a Poll {">>"}</Button>
          </Link>
        </div>
      </main>
    </>
  )
}
