import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Offcanvas from 'react-bootstrap/Offcanvas';
import OffcanvasHeader from 'react-bootstrap/OffcanvasHeader';
import OffcanvasTitle from 'react-bootstrap/OffcanvasTitle';
import OffcanvasBody from 'react-bootstrap/OffcanvasBody';
import { Link } from 'react-router-dom'

import Nav from 'react-bootstrap/Nav';

function Sidebar({handleClose, show}) {
  return (
    <Offcanvas id="offcanvas-full" className="offcanvas-full bg-transparent" show={show}  onHide={handleClose} placement="end" responsive="lg">

      <Offcanvas.Body className="offcanvasbody-full bg-transparent">
        <Nav
          className="nav-vertical justify-content-center flex-column  bg-transparent"
          variant="tabs"
          defaultActiveKey="/home">
          <Card className="card-full-height bg-transparent">
            <Card.Header className="card-header-mine" as="h5">
              <span> Featuring</span>
              <button className="btn-close-mine" onClick={handleClose}></button>
            </Card.Header>
            <Card.Body className="bg-transparent">
              <ListGroup className="list-group-flush bg-transparent">
                <ListGroup.Item className="bg-transparent">
                  <Nav.Item className="bg-transparent">
                    <Link
                      className="rr-link"
                      to="/home"
                      onClick={handleClose}>
                      Home
                    </Link>
                  </Nav.Item>
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent">
                  <Nav.Item>
                    <Link
                      className="rr-link"
                      to="/gro-cheri"
                      onClick={handleClose}>
                      Gro-Cheri
                    </Link>
                  </Nav.Item></ListGroup.Item>
                <ListGroup.Item className="bg-transparent">
                  <Nav.Item>
                    <Link
                      className="rr-link"
                      to="/movie-thing"
                      onClick={handleClose}>
                      Movie Thing
                    </Link>
                  </Nav.Item>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default Sidebar