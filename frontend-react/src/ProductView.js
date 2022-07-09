import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Dropdown, Modal, Row, Spinner } from 'react-bootstrap';
import { useAuth, useAuthUpdate } from './AuthContext';
import ProductForm from './ProductForm';
import PutMoneyModal from './PutMoneyModal';
import { getCanteenBalance } from './requests/money';
import { deleteProduct, getProducts } from './requests/product';
import TakeMoneyModal from './TakeMoneyModal';



function ProductView () {


    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState([]);
    const [canteenBalance, setCanteenBalance] = useState(0);
    
    const auth = useAuth();
    const updateAuth = useAuthUpdate();


    useEffect(() => {
    (async () => {
        const currentProducts = await getProducts();
        if (auth) {
            const currentBalance = await getCanteenBalance();
            setCanteenBalance(currentBalance.balance);
        }
        console.log(currentProducts);
        setLoading(false);
        setProducts(currentProducts);
    })();
    return () => setLoading(false);
    }, [auth, updateAuth]);



    const handleClose = () => setShow(false);
    const handleShow =  (product) => {
        setProduct(product);
        setShow(true);
    }

    const handleBuy = async () => {
        setLoading(true);
        const newProducts = await deleteProduct(product, products, auth, updateAuth);
        setProducts(newProducts);
        setLoading(false);
        handleClose();
    }


    function sortDate() {

        const newProducts = [...products].sort((td1, td2) => Date.parse(td1.createdAt.date) - Date.parse(td2.createdAt.date));
        setProducts(newProducts);
    }

    function sortByName() {
        const newProducts = [...products].sort((td1, td2) => td1.name < td2.name ? -1 : 1);
        setProducts(newProducts);
    }


    return (
        <Container>
        <Row className="mt-5 align-items-start justify-content-start">
            {auth ? <>
                <Col className="text-start ms-2">
                <h5>Uang Kantin <span className="text-danger">Rp{canteenBalance}</span></h5>
            </Col>
            <Col xs={6}>
                <ProductForm products={products} setProducts={setProducts}/> 
                <TakeMoneyModal canteenBalance={canteenBalance} setCanteenBalance={setCanteenBalance}/>
                <PutMoneyModal canteenBalance={canteenBalance} setCanteenBalance={setCanteenBalance}/>
            </Col>
            </> : null}

            <Col className="text-end me-2">
                
                <Dropdown className="dropdown">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Sorting
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                    <Dropdown.Item onClick={sortDate}>Terbaru</Dropdown.Item>
                    <Dropdown.Item onClick={sortByName}>A-Z</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
           
        </Row>
        

        <Row xs={1} sm={2} md={4} className="g-4 mt-2 mb-5">

        {products.map((product, index) => (
            <>
            
            <Col key={index}>
                <a className="btn" onClick={() => handleShow(product)}>
                    <Card className="hover-overlay" style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={product.image} />
                        
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

               
                    {loading 
                        ? <Spinner animation="border" variants="primary"></Spinner> 
                        : <Button className="mr-4 ml-4" variant="primary" onClick={() => handleBuy(product)}>Ambil</Button>
                    }

                </Modal.Footer>
            </Modal>
        
        </Container> 
        
    );
    }

export default ProductView;
