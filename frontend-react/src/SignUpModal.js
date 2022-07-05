import { useEffect, useRef, useState } from "react";
import { Form, Modal, Button, Navbar, Alert, Spinner } from "react-bootstrap";
import validateUserForm from "./helper/validateUserForm";
import useUserFormValidation from "./hooks/useUserFormValidation";
import { signupSubmit } from "./requests/user";
import UserFormInput from "./UseFormInput";

function SignupModal () {

    const [modal, setModal] = useState(false);
    const [inError, setInError] = useState(false);
    const [loading, setLoading] = useState(false);
    const { values, errors, touched, handleChange, clearAll } = useUserFormValidation();

    const innerRef = useRef();
    const inputTypes = ['username', 'password', 'confirmPassword'];

    
    const handleCancel = () => {

        setModal(!modal);
    }

    useEffect(() => {
        innerRef.current && innerRef.current.focus()       
    }, [modal]);

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

    return (
        <>
            <Navbar.Text onClick={()=> setModal(true)} className="btn btn-link" as="span" style={{ textDecoration: 'none' }}>Sign up</Navbar.Text>
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