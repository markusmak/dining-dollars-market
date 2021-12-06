import React, { useState, useEffect }from 'react'
import axios from 'axios'
import ReactModal from 'react-modal';
import { Container, Button, Table } from 'react-bootstrap'

const Buy = ({ listOpen, setListOpen }) => {
  const [changePage, setChangePage] = useState(false)
  const [numSwipes, setNumSwipes] = useState(undefined)
  const [swipes, setSwipes] = useState([])

  return (
    <div>
      <ReactModal isOpen={ listOpen } ariaHideApp={ false } >
      {!changePage &&
        <>
          <Container>
            <h2>Purchase your Swipe</h2>
            <p>How many swipes are your purchasing?</p>
            <input type="number" className="my-2" onChange={e => setNumSwipes(e.target.value)}></input><br/>
            <Button variant="outline-secondary" onClick={async() => {
              const { data } = await axios.post('/swipe/remove', { num: numSwipes })
              console.log(data)
              setChangePage(true)
              setSwipes(data)
            }}>Confirm</Button>
            <Button variant="outline-secondary" onClick={() => setListOpen(false) }>Cancel</Button>
          </Container>
        </>
      }
      {changePage &&
        <>
          <Container>
          <h2>Swipe Matching Information</h2>
          <Table>
            <thead>
              <tr>
                <th>Number of Swipes</th>
                <th>Price</th>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {swipes.map(e => 
              <>
                <tr key={e._id}>
                  <td>{e.numCurrent}</td> 
                  <td>{e.price}</td> 
                  <td>{e.username}</td>
                  <td>{e.email}</td>
                </tr>
              </>)}
            </tbody>
          
          </Table>
            <Button variant="outline-secondary" onClick={() => {
              setListOpen(false)
              setChangePage(false)
              }}>Close</Button>
          </Container>
        </>
      }
      </ReactModal>
    </div>

      
        
    
  )
}

export default Buy