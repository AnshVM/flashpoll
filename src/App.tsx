import { useEffect } from 'react';
import axios from 'axios';
import { useStore } from './store/store';
import Home from './pages';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Create from './pages/create';
import Login from './pages/login';
import PollSubmitPage from './pages/poll';
import Poll from './pages/results';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  }, {
    path: "/create",
    element: <Create />
  }, {
    path: "/login",
    element: <Login />
  }, {
    path: "/poll/:pollID",
    element: <PollSubmitPage />
  }, {
    path: "/poll/results/:pollID",
    element: <Poll />,
  }
])
export default function App() {

  const setAccessToken = useStore(store => store.setAccessToken)
  const setRefreshToken = useStore(store => store.setRefreshToken)

  useEffect(() => {
    if (!setAccessToken || !setRefreshToken) return
    axios.post(`/api/refresh`,{refreshToken:window.localStorage.getItem('refreshToken')})
      .then((res) => {
        setAccessToken(res.data.accessToken)
        setRefreshToken(res.data.refreshToken)  
      })
      .catch(() => {
        if(window.location.pathname != '/login') {
          window.location.assign('/login')
        }
      })
  },[setAccessToken,setRefreshToken])

  return (
      <RouterProvider router={router} />
  )
}
