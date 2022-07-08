import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";


function TakeMoneyModal() {


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow =  () => {
        setShow(true);
    }

    return <>
        <Button onClick={handleShow}>Ambil Uang Kantin</Button>
        <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header closeButton>
                <Modal.Title>Ambil Uang Kantin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group className="mb-5" sm={6} >
                    <Form.Label>Masukkan Nominal</Form.Label>
                    <Form.Control></Form.Control>
                        
                </Form.Group>
               
                </Modal.Body>
               
            </Modal>
    </>
}

export default TakeMoneyModal;