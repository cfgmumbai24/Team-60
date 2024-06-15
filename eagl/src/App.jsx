import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import {RouterProvider} from './router'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import router from './configs/router';


function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
