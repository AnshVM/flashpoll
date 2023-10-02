import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Create from './pages/create'
import Login from './pages/login'
import PollSubmitPage from './pages/poll'
import Poll from './pages/results'
import { ChakraProvider } from '@chakra-ui/react'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)
