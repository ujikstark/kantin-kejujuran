import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Dropdown, Modal, Row } from 'react-bootstrap';
import { useAuth, useAuthUpdate } from './AuthContext';
import ProductForm from './ProductForm';
import { deleteProduct, getProducts } from './requests/product';



function ProductView () {


    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [products, setProducts] = useState([]);
    const auth = useAuth();
    const updateAuth = useAuthUpdate();


    useEffect(() => {
    (async () => {
        const currentProducts = await getProducts();
        setLoading(false);
        setProducts(currentProducts);
    })();
    return () => setLoading(false);
    }, [loading]);


    return (
        <Container>
        <Row className="mt-5 align-items-start justify-content-start">
            {auth ? <>
                <Col>
                <p>Canteen Rp1.000.000</p>
            </Col>
            <Col><ProductForm products={products} setProducts={setProducts}/> </Col>
            </> : null}

            <Col>
                
                <Dropdown className="dropdown">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Sorting
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                    <Dropdown.Item>Terbaru</Dropdown.Item>
                    <Dropdown.Item>A-Z</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
           
        </Row>
        

        <Row xs={1} sm={2} md={4} className="g-4 mt-2">

        {products.map((product, index) => (
            <>
            <Col>
                <a className="btn" onClick={handleShow}>
                    <Card className="hover-overlay">
                        <Card.Img variant="top" src="https://ceklist.id/wp-content/uploads/2022/03/2.-Merk-Big-Boss.jpeg" />
                        
                        <Card.Body className="text-start">
                        <small className="text-warning">Produk Terbaru</small>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>
                        Rp.{product.price}
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </a>
            </Col>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header closeButton>
                <Modal.Title>{product.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <h6>Deskripsi: </h6>
                {product.description}
                </Modal.Body>
                <Modal.Footer>

                <Button variant="primary">Buy Now</Button>
                </Modal.Footer>
            </Modal>
        
            </>
            
        ))}
                        </Row>

        
        
        </Container> 
        
    );
    }

export default ProductView;
