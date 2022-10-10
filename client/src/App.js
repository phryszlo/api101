import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css'; //CDN link in index.html
import './style.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Offcanvas from 'react-bootstrap/Offcanvas';
import OffcanvasHeader from 'react-bootstrap/OffcanvasHeader';
import OffcanvasTitle from 'react-bootstrap/OffcanvasTitle';
import OffcanvasBody from 'react-bootstrap/OffcanvasBody'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

import {Link} from 'react-router-dom'

import GroCheri from './components/GroCheri';
import ContainerFluidExample from './components/ContainerFluidExample';


function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (

    <Container fluid className="App app-container">
      {/* <Row>
        <Col xs={1}></Col>

        <Col xs={9}> */}
      <div className="app-content">
        <h1 className="title">The API Special 101</h1>
        <Button className="show-offcanvas-button" variant="primary" onClick={handleShow}>
          Launch
        </Button>

        {/* <ContainerFluidExample /> */}

        <Routes>
          <Route index path='home' />
          <Route path='gro-cheri' element={<GroCheri />} />
        </Routes>
      </div>
      {/* </Col>

        <Col> */}
      {/* {['start', 'end', 'top', 'bottom'].map((placement, idx) => ( */}
      <Offcanvas className="offcanvas-full" show={show} onHide={handleClose} placement="end" responsive="lg">
        <OffcanvasHeader closeButton>
          {/* <OffcanvasTitle>Navigation</OffcanvasTitle> */}
        </OffcanvasHeader>
        <Offcanvas.Body className="offcanvasbody-full">
          <Nav className="nav-vertical justify-content-center flex-column" variant="tabs" defaultActiveKey="/home">
            <Card className="card-full-height">
              <Card.Header as="h5">Featuring</Card.Header>
              <Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>
                    <Nav.Item>
                      <Link className="rr-link" to="/home">Home</Link>
                    </Nav.Item>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Nav.Item>
                      <Link className="rr-link" to="/gro-cheri" eventKey="link-1">Gro-Cheri</Link>
                    </Nav.Item></ListGroup.Item>
                  <ListGroup.Item>
                    <Nav.Item>
                      <Link className="rr-link" eventKey="link-2">Something Else</Link>
                    </Nav.Item>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
      {/* </Col>
      </Row> */}

    </Container >
  );
}


export default App;
