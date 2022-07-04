import { useEffect, useRef, useState } from "react";
import { Form, Modal, Button, Navbar, Alert, Spinner } from "react-bootstrap";
import { signupSubmit } from "./requests/user";

function SignupModal () {

    const [modal, setModal] = useState(false);
    const [inError, setInError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    
    const handleCancel = () => {

        setModal(!modal);
    }

    const handleSignupSubmit = async () => {
        setLoading(true);
        const isCreated = await signupSubmit(values);
        
        if (!isCreated) {
            setInError(true);
            setLoading(false);
            
            return;
        }

        // const { auth, user } = await signinSubmit(values);
        setLoading(false);
        // updateAuth(auth);

    }

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    return (
        <>
            <Navbar.Text onClick={()=> setModal(true)} className="btn btn-link" as="span" style={{ textDecoration: 'none' }}>Sign up</Navbar.Text>
            <Modal size="md" show={modal} onHide={handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Student ID<span className="text-danger"> *</span></Form.Label>
                            <Form.Control onChange={handleChange} type="username" placeholder="Enter ID" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password<span className="text-danger"> *</span></Form.Label>
                            <Form.Control onChange={handleChange} type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formConfirmPassword">
                            <Form.Label>Password Confirmation<span className="text-danger"> *</span></Form.Label>
                            <Form.Control type="confirmPassword" placeholder="Confirm your password" />
                        </Form.Group>
                        <div className="d-flex justify-content-around mt-4">
                        {loading
                            ? <Spinner animation="border" variant="primary"/>
                            : <Button className="mr-4 ml-4" variant="primary" type="submit" onClick={handleSignupSubmit}>Sign up</Button>
                        }
                    </div>     
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default SignupModal;