
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Header from './Header'
import { Stack, Button, Container, Table } from 'react-bootstrap';


const Swipe = () => {

  const [user, setUser] = useState({})
  const [swipe, setSwipe] = useState([])

  useEffect(async () => {
    const { data } = await axios.get('/account/user')
    if (!(typeof data === "string")) {
      setUser(data)
    } else {
      setUser(null)
      setSwipe(null)
    }
    if (user !== null) {
      const userID = data.userID
      const d2 = await axios.get('/swipe/swipe?id=' +  userID)
      if (d2 !== null) {
        setSwipe(d2.data)
      } else {
        setSwipe(null)
      }
    } 
  }, [])

  return (
    <>
      <Header user={ user }/>
      <Container>
        <Stack gap={1} className="mx-auto my-3">
          <h2>My Swipes</h2>
        </Stack>
      <Table striped bordered hover>
          <thead>
            <tr>
              <th>Intial Swipe Supply</th>
              <th>Current Swipe Supply</th>
              <th>Price Listed ($)</th>
            </tr>
          </thead>
          <tbody>
          { swipe && (swipe.map((s, i) => 
          <>
            <tr key={i}>
              <td>{s.numSupply}</td>
              <td>{s.numCurrent}</td> 
              <td>{s.price}</td>
            </tr>
          </>) )}
        </tbody>
      </Table> 
      </Container>
    </>
  )
}

export default Swipe
