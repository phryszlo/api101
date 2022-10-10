import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function GroCheri() {


  useEffect(() => {

  }, [])


  // 🟢
  return (
    <div className="component-container">
      <h2 className="title">Gro-cheri<span>&#174;</span></h2>
      <h3 className="subtitle">The Shopping Shortcut</h3>
      <Form>
        <Form.Group className="form-row mb-3" controlId="formBasicEmail">
          <Form.Control type="email" placeholder="Enter zip code" />

          <Button variant="warning" type="submit">
            Submit
          </Button>
        </Form.Group>


      </Form>
    </div>
  )
}

export default GroCheri