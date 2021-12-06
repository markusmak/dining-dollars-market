import React, { useState, useEffect }from 'react'
import axios from 'axios'
import ReactModal from 'react-modal';
import { Container, Button } from 'react-bootstrap'

const List = ({ user, listOpen, setListOpen }) => {
  const [numSwipes, setNumSwipes] = useState(undefined)
  const [price, setPrice] = useState(undefined)

  return (
    <div>
      <ReactModal isOpen={ listOpen } ariaHideApp={ false } >
        <Container>
          <h2>List your Swipe</h2>
          <p>How many swipes you selling?</p>
          <input type="number" className="my-2" onChange={e => setNumSwipes(e.target.value)}></input>
          <p>What is the price you are willing to sell for?</p>
          <input type="number" className="my-2" onChange={e => setPrice(e.target.value)}></input>
          <p> *** Please note that your offers will only be filled if your listed
            price is the lowest available price. You may never get your offer filled if you
            set the listed price too high. </p>
          <Button variant="outline-secondary" onClick={async() => {
            const { data } = await axios.post('/swipe/add', { userID: user.userID, numSupply: numSwipes, 
              numCurrent: numSwipes, price: price, active: true})
            setListOpen(false) 
          }}>Submit</Button>
          <Button variant="outline-secondary" onClick={() => setListOpen(false) }>Cancel</Button>
          </Container>
      </ReactModal>
    </div>
  )
}

export default List