import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ContainerFluidExample() {
  return (
    <Container fluid="xl">
      <Row>
        <Col>1 of 1</Col>
        <Col>2 of 2</Col>
        <Col>1 of 1</Col>
        <Col xs={6} style={{border: 'solid black'}}>2 of 2</Col>
        <Col>1 of 1</Col>
        <Col>2 of 2</Col>
        <Col>1 of 1</Col>
        <Col>2 of 2</Col>
      </Row>
      <Row>
        <Col>1 of 1</Col>
        <Col>2 of 2</Col>
        <Col>1 of 1</Col>
        <Col>2 of 2</Col>
        <Col>1 of 1</Col>
        <Col>2 of 2</Col>
        <Col>1 of 1</Col>
        <Col>2 of 2</Col>
      </Row>

      <Row>
        <Col>1 of 1</Col>
        <Col>2 of 2</Col>
        <Col>1 of 1</Col>
        <Col>2 of 2</Col>
        <Col>1 of 1</Col>
        <Col>2 of 2</Col>
        <Col>1 of 1</Col>
        <Col>2 of 2</Col>
        <Col>1 of 1</Col>
        <Col>2 of 2</Col>
        <Col>1 of 1</Col>
        <Col>2 of 2</Col>
        <Col>1 of 1</Col>
        <Col>2 of 2</Col>
        <Col>1 of 1</Col>
        <Col>2 of 2</Col>
        <Col>1 of 1</Col>
        <Col>2 of 2</Col>
        <Col>1 of 1</Col>
        <Col>2 of 2</Col>
        <Col>1 of 1</Col>
        <Col>2 of 2</Col>
        {/* that's 22 cols */}
      </Row>
    </Container>
  );
}

export default ContainerFluidExample;