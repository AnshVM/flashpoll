import { useEffect } from 'react';
import axios from 'axios';
import { redirect } from 'react-router-dom';
import { useStore } from './store/store';
import Home from './pages';

export default function App() {

  const setAccessToken = useStore(store => store.setAccessToken)
  const setRefreshToken = useStore(store => store.setRefreshToken)


  useEffect(() => {
    if (!setAccessToken || !setRefreshToken) return
    axios.get(`/api/refresh`)
      .then((res) => {
        setAccessToken(res.data.accessToken)
        setRefreshToken(res.data.refreshToken)  
      })
      .catch(() => redirect('/login'))
  },[setAccessToken,setRefreshToken])

  return (
      <Home />
  )
}
