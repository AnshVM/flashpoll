import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { lightYellowShades } from '@/ui/theme';
import { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useStore } from '@/store/store';

const colors = {
  brand: lightYellowShades
};

const theme = extendTheme({ colors });

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter()
  const setAccessToken = useStore(store => store.setAccessToken)
  const setRefreshToken = useStore(store => store.setRefreshToken)


  useEffect(() => {
    if(router.pathname === "/") return
    axios.get('/api/refresh')
      .then((res) => {
        setAccessToken(res.data.accessToken)
        setRefreshToken(res.data.refreshToken)        
      })
      .catch(() => router.push('/login'))
  },[])

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
