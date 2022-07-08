import { useEffect, useRef, useState } from "react";
import { Form, Modal, Button, Navbar, Alert, Spinner } from "react-bootstrap";
import { useAuthUpdate } from "./AuthContext";
import useUserFormValidation from "./hooks/useUserFormValidation";
import { signinSubmit, signupSubmit } from "./requests/user";
import UserFormInput from "./UseFormInput";

function SignupModal () {

    const [modal, setModal] = useState(false);
    const { values, errors, touched, handleChange, clearAll } = useUserFormValidation();
    const [inError, setInError] = useState(false);
    const [loading, setLoading] = useState(false);
    const updateAuth = useAuthUpdate();

    const innerRef = useRef();

    const inputTypes = ['username', 'password', 'confirmPassword'];
    const isFormValid = Object.keys(errors).length === 0 && Object.keys(touched).length === inputTypes.length;


    useEffect(() => {
        innerRef.current && innerRef.current.focus()       
    }, [modal]);

    const toggleModal = () => {
        setModal(!modal);
    }

    const handleCancel = () => {
        setLoading(false);
        clearAll();
        toggleModal();  
    }

    const handleSignupSubmit = async () => {
        setLoading(true);
        const isCreated = await signupSubmit(values);
        
        if (!isCreated) {
            setInError(true);
            setLoading(false);
            
            return;
        }

        const { auth, user } = await signinSubmit(values);
        setLoading(false);
        updateAuth(auth);

    }

    return (
        <>
            <Navbar.Text onClick={toggleModal} className="btn btn-link" as="span" style={{ textDecoration: 'none' }}>Sign up</Navbar.Text>
            <Modal size="md" show={modal} onHide={handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                {inputTypes.map((type, index) => (
                            <UserFormInput
                                type={type}
                                asterisk={true}
                                innerRef={innerRef}
                                values={values}
                                errors={errors}
                                touched={touched}
                                handleChange={handleChange}
                                key={index}
                            />
                        ))}
                        {inError &&
                        <Alert className="mt-4" variant="danger" onClose={() => setInError(false)} dismissible>
                            <p>This Student ID is already taken, try another one.</p>
                        </Alert>
                        }
                        <div className="d-flex justify-content-around">
                            {loading 
                                ? <Spinner animation="border" variants="primary"></Spinner> 
                                : <Button type="hidden" className="mr-4 ml-4" variant="primary" size="lg" disabled={!isFormValid} onClick={handleSignupSubmit}>Sign up</Button>
                            }    
                    </div>     
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default SignupModal;