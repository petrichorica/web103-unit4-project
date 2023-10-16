import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import ViewCoffee from './pages/ViewCoffee'
import EditCoffee from './pages/EditCoffee'
import CreateCoffee from './pages/CreateCoffee'
import CoffeeDetails from './pages/CoffeeDetails'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <CreateCoffee title='BREW CUSTOM | Customize' />
    },
    {
      path:'/customcoffee',
      element: <ViewCoffee title='BREW CUSTOM | Custom Coffee Beverages' />
    },
    {
      path: '/customcoffee/:id',
      element: <CoffeeDetails title='BREW CUSTOM | View' />
    },
    {
      path: '/edit/:id',
      element: <EditCoffee title='BREW CUSTOM | Edit' />
    }
  ])

  return (
    <div className='app'>

      <Navigation />

      { element }

    </div>
  )
}

export default App