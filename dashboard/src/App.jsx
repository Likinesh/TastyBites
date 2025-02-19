import React from 'react'
import LandingPage from './vendorDashboard/pages/LandingPage'
import { Routes, Route } from 'react-router-dom'

import "./App.css"
import NavBar from './vendorDashboard/components/NavBar'
import Login from './vendorDashboard/components/forms/Login'
import NotFound from './vendorDashboard/components/NotFound'
import {App } from '../../client/src/App'
const App = () => {
  return (
    <div>
      <Routes>
          <Route path='/' element={<App />} />
          <Route path='/admin' element = {<LandingPage />}/>
          <Route path='/*' element = {<NotFound />} />
      </Routes>
    </div>
  )
}

export default App