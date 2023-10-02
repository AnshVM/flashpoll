import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useStore } from './store/store';
import Home from './pages';

export default function App() {

  const setAccessToken = useStore(store => store.setAccessToken)
  const setRefreshToken = useStore(store => store.setRefreshToken)
  const nav = useNavigate();

  useEffect(() => {
    if (!setAccessToken || !setRefreshToken) return
    axios.get(`/api/refresh`)
      .then((res) => {
        setAccessToken(res.data.accessToken)
        setRefreshToken(res.data.refreshToken)  
      })
      .catch(() => nav('/login'))
  },[setAccessToken,setRefreshToken])

  return (
      <Home />
  )
}
