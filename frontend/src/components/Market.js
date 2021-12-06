
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './Header'
import Buy from './Buy'
import List from './List'
import { Stack, Button, Container } from 'react-bootstrap';

const Market = () => {

  const [user, setUser] = useState({})
  const [minS, setMinS] = useState({})
  const [listOpen, setListOpen] = useState(false)
  const [listOpenL, setListOpenL] = useState(false)


  useEffect(async () => {
    const { data } = await axios.get('/account/user')
    if (!(typeof data === "string")) {
      setUser(data)
    } else {
      setUser(null)
    }

    const d3 = await axios.get('/swipe/floor')
    if (d3 !== null) {
      setMinS(d3.data)
    } else {
      setMinS(null)
    }
  }, [])

  return (
    <>
      <Container>
        <Header user={ user }/>
        <Stack gap={1} className="col-md-5 mx-auto my-3">
          <h2>Swipe Information</h2>
        </Stack>
        {minS && (
          <>
            <Stack gap={2} className="col-md-5 mx-auto">
              <p>Current Sale Price: ${ minS.price }</p>
              <p>Remaining Swipes at Sale Price: { minS.numCurrent }</p>
            </Stack>
          </>)}
        {user && (
          <Stack gap={2} className="col-md-5 mx-auto">
            <Button variant="outline-secondary" onClick={() => setListOpen(!listOpen)}>Purchase Swipe</Button>
            <Button variant="outline-secondary" onClick={() => setListOpenL(!listOpenL)}>List Swipe</Button>
          </Stack>
        )}
        <Buy listOpen={ listOpen } setListOpen={ setListOpen }/>
        <List listOpen={ listOpenL } setListOpen={ setListOpenL } user={ user }/>
      </Container>
    </>
  )
}

export default Market
