import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Col, Container, Dropdown, Modal, Row } from 'react-bootstrap';
import { useState } from 'react';

function App() {

  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="App">
      <Container>
        <Dropdown className="mt-5 text-end dropdown">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Sorting
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Terbaru</Dropdown.Item>
            <Dropdown.Item href="#/action-2">A-Z</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Row xs={1} sm={2} md={4} className="g-4 mt-2">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Col>
            <a className="btn" onClick={handleShow}>
              <Card className="hover-overlay">
                  <Card.Img variant="top" src="https://ceklist.id/wp-content/uploads/2022/03/2.-Merk-Big-Boss.jpeg" />
                  
                  <Card.Body className="text-start">
                    <small className="text-warning">Produk Terbaru</small>
                    <Card.Title>Buku tulis Big Boss</Card.Title>
                    <Card.Text>
                    Rp.192. 0000
                    </Card.Text>
                  </Card.Body>
                </Card>
            </a>
              
            </Col>
          ))}
      </Row>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
        <Modal.Title>Buku Tulis Big Boss</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h6>Deskripsi: </h6>
        Big Boss isi 36 lembar, Motif sampul Campus, Tebal kertas 70 GSM, Panjang 18cm, Lebar 25cm, Harga per 1 pack, 1 pack isi 10 pcs

        </Modal.Body>
        <Modal.Footer>
   
        <Button variant="primary">Buy Now</Button>
        </Modal.Footer>
      </Modal>
      </Container>
      

      


    </div>
  );
}

export default App;
