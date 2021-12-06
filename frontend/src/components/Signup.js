import React, { useState } from 'react'
import axios from 'axios'
import {
  Link,
  useNavigate
} from "react-router-dom";

import LogHeader from "./LogHeader"
import { Container, Button } from 'react-bootstrap'




const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState(false)
  const [first, setFirst] = useState(true)
  const [statement, setStatement] = useState('')
  let navigate = useNavigate();


  const signupUser = async () => {
    const { data } = await axios.post('/account/signup', { username, password, email })
    if (!(typeof data === "string")) {
      setSuccess(true)
      navigate('/')
    } else {
      setStatement(data)
      setFirst(true)
    }
  }
  
  return (
    <>
      <LogHeader />
      <Container>
        <h3 className="my-3">Sign Up</h3>
        <p>Username:</p> 
        <input className="mb-3" onChange={e => setUsername(e.target.value)}/> 
        <br/>
        <p>Email:</p> 
        <input onChange={e => setEmail(e.target.value)}/> 
        <br />
        <p>Password:</p> 
        <input onChange={e => setPassword(e.target.value)}/><br/>
        <Button variant="outline-secondary" className="my-2 mr-3" onClick={ signupUser }> Sign Up </Button> 
        <Button variant="outline-secondary my-2 ml-2" href="/account/auth/google">Sign In with Google</Button>
        <br/><p>{ statement }</p>
      </Container>
    </>
  )
}

export default Signup