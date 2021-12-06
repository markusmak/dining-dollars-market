import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import Signup from './components/Signup'
import Login from './components/Login'
import Market from './components/Market'
import Swipe from './components/Swipe'


import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
 
const App = () => (
  <Router>
    <Routes>
      <Route exact path="/signup" element={ <Signup/> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/" element={ <Market /> } />
      <Route path="/me" element={ <Swipe /> } />
    </Routes>
  </Router>
) 
export default App