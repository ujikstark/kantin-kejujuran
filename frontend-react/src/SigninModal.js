import { useEffect, useRef, useState } from "react";
import { Form, Modal, Button, Alert, Spinner } from "react-bootstrap";


function SigninModal () {

    const [modal, setModal] = useState(false);
    const [inError, setInError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCancel = () => {

        setModal(!modal);
    }



    return (
        <>
            <Button onClick={()=> setModal(true)} variant="primary">Sign in</Button>
            <Modal size="md" show={modal} onHide={handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign in</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Student ID</Form.Label>
                            <Form.Control type="username" placeholder="Enter ID" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <div className="d-flex justify-content-around mt-4">
                        {loading
                            ? <Spinner animation="border" variant="primary"/>
                            : <Button className="mr-4 ml-4" variant="primary" type="submit">Sign in</Button>
                        }
                    </div>     
                    </Form>
                    {/* {inError &&
                        <Alert className="mt-4" variant="danger" onClose={() => setInError(false)} dismissible>
                            <p>Incorrect username or password.</p>
                        </Alert>
                    }
                    <div className="d-flex justify-content-around mt-4">
                        {loading
                            ? <Spinner animation="border" variant="primary"/>
                            : <Button disabled={!isFormFilled} className="mr-4 ml-4" variant="primary" type="submit" onClick={handleSigninSubmit}>Sign in</Button>
                        }
                    </div>             
                    <div className="d-flex justify-content-around mt-2">
                        <ResetPasswordEmailModal/>
                    </div> */}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default SigninModal;