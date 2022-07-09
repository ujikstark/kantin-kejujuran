import { useState } from "react";
import { Alert, Button, Form, Modal, Spinner } from "react-bootstrap";
import { editCanteenBalance } from './requests/money';



function PutMoneyModal({canteenBalance, setCanteenBalance}) {


    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [putValue, setPutValue] = useState(0);

    const handleShow =  () => {
        setShow(true);
    }

    const handleClose = () => {
        setLoading(false);
        setPutValue(0);
        setShow(false);
    }

    const handleChange = e => {
        setPutValue(e.target.value);
    };

    const handleTake = async () => {
        setLoading(true);        
        
        const balance = parseInt(canteenBalance) + parseInt(putValue);
        const newCanteenBalance = await editCanteenBalance(balance);

        setCanteenBalance(balance);
        handleClose();

        setLoading(false);

    }

    

    return <>
        <Button onClick={handleShow}>Taruh Uang Kantin</Button>
        <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header closeButton>
                <Modal.Title>Taruh Uang Kantin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group className="mb-3" sm={6}>
                    <Form.Label>Masukkan Nominal</Form.Label>
                    <Form.Control
                    name="balance" values={putValue} type="number" placeholder="Rp1000" onChange={handleChange}></Form.Control>
                </Form.Group>
              
                <div className="d-flex justify-content-around">
                    {loading 
                        ? <Spinner animation="border" variants="primary"></Spinner> 
                        : <Button className="mr-4 ml-4" variant="primary" onClick={handleTake}>Taruh</Button>
                    }  
                </div>
               
                </Modal.Body>
               
            </Modal>
    </>
}

export default PutMoneyModal;