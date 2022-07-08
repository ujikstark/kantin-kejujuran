import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Dropdown, Modal, Row } from 'react-bootstrap';
import { useAuth, useAuthUpdate } from './AuthContext';
import ProductForm from './ProductForm';
import { deleteProduct, getProducts } from './requests/product';



function ProductView () {


    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState([]);
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


    const handleClose = () => setShow(false);
    const handleShow =  (product) => {
        setProduct(product);
        setShow(true);
    }

    const handleBuy = async () => {
        const newProducts = await deleteProduct(product, products, auth, updateAuth);
        setProducts(newProducts);

        handleClose();
    }




    return (
        <Container>
        <Row className="mt-5 align-items-start justify-content-start">
            {auth ? <>
                <Col className="text-start ms-2">
                <p>Canteen Rp1.000.000</p>
            </Col>
            <Col><ProductForm products={products} setProducts={setProducts}/> </Col>
            </> : null}

            <Col className="text-end me-2">
                
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
                <a className="btn" onClick={() => handleShow(product)}>
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
            
        
            </>
            
        ))}
                        </Row>

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

                <Button disabled={!auth} variant="primary" onClick={() => handleBuy(product)}>Buy Now</Button>
                </Modal.Footer>
            </Modal>
        
        </Container> 
        
    );
    }

export default ProductView;
