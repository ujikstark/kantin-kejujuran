import { useEffect, useRef, useState } from "react";
import { Alert, Button, Form, Modal, Spinner } from "react-bootstrap";
import { useAuth, useAuthUpdate } from "./AuthContext";
import { addProduct } from "./requests/product";
import UserFormInput from "./UseFormInput";
import PropTypes from 'prop-types';
import useProductFormValidation from "./hooks/useProductFormValidation";




function ProductForm ({products, setProducts}) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loading, setLoading] = useState(false);
    const [inError, setInError] = useState(false);
    const innerRef = useRef();  

    const auth = useAuth();
    const updateAuth = useAuthUpdate();
    

    const inputTypes = ['name', 'price', 'description', 'imageUrl'];
    const { values, errors, touched, handleChange, clearAll } = useProductFormValidation();
    const isFormValid = Object.keys(errors).length === 0 && Object.keys(touched).length === inputTypes.length;


    useEffect(() => {
        innerRef.current && innerRef.current.focus()       
    }, [show]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const newProducts= await addProduct(products, values, auth, updateAuth);
        
        if (newProducts === products) {
            setLoading(false);
            return;
        }

        setLoading(false);

        setProducts(newProducts);
        window.location.reload();      
        clearAll();  
        handleClose();
    }


    return <>
        <Button onClick={handleShow}>Tambah Jualan</Button>
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
    >
    <Modal.Header closeButton>
        <Modal.Title>Tambah Jualan</Modal.Title>
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
                            <p>Fill first.</p>
                        </Alert>
                        }
                        <div className="d-flex justify-content-around">
                            {loading 
                                ? <Spinner animation="border" variants="primary"></Spinner> 
                                : <Button type="hidden" className="mr-4 ml-4" variant="primary" size="lg" disabled={!isFormValid} onClick={handleSubmit}>Tambah</Button>
                            }    
                    </div>     
                    </Form>
    </Modal.Body>

</Modal>
    </>
    

}


export default ProductForm;