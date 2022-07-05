import { Form } from "react-bootstrap";
import PropTypes from 'prop-types';
import userFormText from "./helper/userFormText";


function UserFormInput ({ type, asterisk, innerRef, handleChange, values, errors, touched}) {
    const ref = type === 'email' ? innerRef : null;
    const htmlType = type.toLowerCase().includes('password') ? 'password' : type;


    return (
        <Form.Group className="mb-3">
            <Form.Label htmlFor={type}>{userFormText[type].label}{asterisk && <span className="text-danger"> *</span>}</Form.Label>
            <Form.Control
                    ref={ref} 
                    onChange={handleChange}
                    // isInvalid={touched[type] && errors[type]} isValid={touched[type] && !errors[type]}
                    values={values['type']} type={htmlType} name={type} id={type} placeholder={userFormText[type].placeholder}
                />  
            
            
            {/* <Form.Control.Feedback type="invalid">{errors[type]}</Form.Control.Feedback> */}
        </Form.Group>
    );
}   

UserFormInput.propTypes = {
    type: PropTypes.string,
    asterisk: PropTypes.bool,
    innerRef: PropTypes.object,
    handleChange: PropTypes.func,
    values: PropTypes.object,
    errors: PropTypes.object,
    touched: PropTypes.object
};

export default UserFormInput;