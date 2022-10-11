import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './home-style.css';
import img from './mad_myrtle.jpg';

function Home() {
  return (
    <div className="component home-component">
      <Card className="card-home">
        <Card.Body>
          <Card.Title>Home</Card.Title>
          <Card.Subtitle>
            Welcome to the Home Component
          </Card.Subtitle>
          <Card.Text>
            your options are over there {'-->'}
          </Card.Text>
          <Card.Img className="home-card-img" src={img} />
          <Card.Text>(this is Myrtle)</Card.Text>

        </Card.Body>
      </Card>
    </div>
  )
}

export default Home