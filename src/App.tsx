import { useEffect } from 'react';
import axios from 'axios';
import { useStore } from './store/store';
import Home from './pages';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Create from './pages/create';
import Login from './pages/login';
import PollSubmitPage from './pages/poll';
import Poll from './pages/results';
import { SERVER_BASE_URL } from './config';

export default function App() {

  const setAccessToken = useStore(store => store.setAccessToken)
  const setRefreshToken = useStore(store => store.setRefreshToken)
  const nav = useNavigate()

  useEffect(() => {
    if (!setAccessToken || !setRefreshToken) return
    axios.post(`${SERVER_BASE_URL}/api/refresh`, { refreshToken: window.localStorage.getItem('refreshToken') })
      .then((res) => {
        setAccessToken(res.data.accessToken)
        setRefreshToken(res.data.refreshToken)
      })
      .catch(() => {
        if (window.location.pathname != '/login') {
          nav('/login')
        }
      })
  }, [setAccessToken, setRefreshToken])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element = {<Create />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/poll/:pollID" element={<PollSubmitPage/>} />
      <Route path="/poll/results/:pollID" element={<Poll/>} />
    </Routes>
  )
}
