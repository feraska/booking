import React, { useContext } from 'react'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Home from 'pages/home/Home';
import List from 'pages/list/List';
import Hotel from 'pages/hotel/Hotel';
import Login from 'pages/login/Login';
import Register from 'pages/register/Register';
import { AuthContext } from 'context/AuthContext';

const Layout = () => {
  return(
    <Outlet/>
  )
}
function App() {
  const {user} = useContext(AuthContext)
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
        {
          path: "/",
          element: <Home/>
        },
        {
          path: "/hotels",
          element: <List/>
        },
        {
          path: "/hotels/:id",
          element: <Hotel/>
        },
        {
          path: "/login",
          element: user?<Home/>:<Login/>
        },
        {
          path:"/register",
          element: user?<Home/>:<Register/>
        }
      ]
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
