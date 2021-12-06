import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  useNavigate,
  Link
} from "react-router-dom";
import LogHeader from "./LogHeader"

import { Container, Button } from 'react-bootstrap'


const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [success, setSuccess] = useState(false)
  const [statement, setStatement] = useState('')
  let navigate = useNavigate();

  const loginUser = async () => {
    const { data } = await axios.post('/account/login', { username, password })
    if (!(typeof data === "string")) {
      setSuccess(true)
      navigate('/')
    } else {
      setStatement('Login Unsuccessful')
    }
  }
  
  return (
    <>
      <LogHeader />
      <Container>
        <h3 className="my-3">Login</h3>
        <p>Username:</p> 
        <input className="mb-3" onChange={e => setUsername(e.target.value)}/> 
        <br/>
        <p>Password:</p> 
        <input onChange={e => setPassword(e.target.value)}/><br/>
        <Button variant="outline-secondary" className="my-2 mr-3" onClick={ loginUser }> Login </Button> 
        <Button variant="outline-secondary my-2 ml-2" href="/account/auth/google">Sign In with Google</Button>
        <br/><p>{ statement }</p>
      </Container>
      
    </>
  )
}

export default Login
