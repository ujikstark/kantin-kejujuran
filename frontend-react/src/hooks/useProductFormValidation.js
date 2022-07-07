import { useEffect, useState } from 'react';
import validateProductForm from '../helper/validateProductForm';

export default function useProductFormValidation () {
    const [values, setValues] = useState({
        name: '',
        description: '',
        imageUrl: '',
        price: '',
    });
    const [touched, setTouched] = useState({}); 
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setErrors(validateProductForm(values));
    }, [values]);

    const handleChange = e => {

        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
        setTouched({
            ...touched,
            [name]: value !== ''
        });
    };

    const clearAll = () => {
        setErrors({});
        setTouched({});
        setValues({
            name: '',
            description: '',
            imageUrl: '',
            price: '',
        });
    };

    return { values, errors, touched, handleChange, clearAll };
};
