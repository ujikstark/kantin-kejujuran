import { useState } from "react";
import { Alert, Button, Form, Modal, Spinner } from "react-bootstrap";
import { editCanteenBalance } from './requests/money';



function TakeMoneyModal({canteenBalance, setCanteenBalance}) {


    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [takeValue, setTakeValue] = useState(0);
    const [inError, setInError] = useState(false);


    const handleShow =  () => {
        setShow(true);
    }

    const handleClose = () => {
        setLoading(false);
        setTakeValue(0);
        setShow(false);
    }

    const handleChange = e => {
        setTakeValue(e.target.value);
    };

    const handleTake = async () => {
        setLoading(true);        
         if (parseInt(takeValue) >= parseInt(canteenBalance)) {
            setInError(true);
            setLoading(false);
        } else {
            const balance = parseInt(canteenBalance) - parseInt(takeValue);
            const newCanteenBalance = await editCanteenBalance(balance);

            setCanteenBalance(balance);
            handleClose();
        }

        setLoading(false);

    }

    

    return <>
        <Button className="me-4 ms-4" onClick={handleShow}>Ambil Uang Kantin</Button>
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
                    name="balance" values={takeValue} type="number" placeholder="Rp1000" onChange={handleChange}></Form.Control>
                </Form.Group>
                {inError &&
                <Alert className="mt-4" variant="danger" onClose={() => setInError(false)} dismissible>
                        <p>Your Request Balance is more than canteen balance!</p>
                </Alert>
                }
                <div className="d-flex justify-content-around">
                    {loading 
                        ? <Spinner animation="border" variants="primary"></Spinner> 
                        : <Button className="mr-4 ml-4" variant="primary" onClick={handleTake}>Ambil</Button>
                    }  
                </div>
               
                </Modal.Body>
               
            </Modal>
    </>
}

export default TakeMoneyModal;