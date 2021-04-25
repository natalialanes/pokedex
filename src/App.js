import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import { GlobalCartInformationProvider } from './hooks'
import { Dashboard, HomePage, NotFound } from './pages/index'

function App () {
  return (
    <GlobalCartInformationProvider>
      <Router>
        <div className='App'>
          <Switch>
            <Route path='/' exact={true}>
              <Dashboard />
            </Route>
            <Route path='/home/:pokemonType'>
              <HomePage />
            </Route>
            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
        </div>
      </Router>
    </GlobalCartInformationProvider>
  )
}

export default App
