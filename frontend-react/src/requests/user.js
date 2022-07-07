import axios from "../config/axios";
import { addMinutes } from 'date-fns';


export async function signinSubmit (values) {
    const payload = {
        username: values.username,
        password: values.password
    };

    const response = await axios.post('/login', JSON.stringify(payload))
        .then(response => {
            // return empty string
            return response.headers;
        })
        .catch(() => null);
    
    const auth = {};
    
    if (response === null) {
        auth.isAuthenticated = false;

        return { auth, user: null };
    }

    auth.exp = addMinutes((new Date()), 2).getTime();
    auth.isAuthenticated = true;

    sessionStorage.setItem('user', JSON.stringify(response));
    return { auth, response }; 
}

export async function signupSubmit (values) {
    const payload = {
        username: values.username,
        password: values.password,
    }

    return await axios.post('/registration', JSON.stringify(payload))
        .then(() => true)
        .catch(() => false);
}


export async function logout (updateAuth) {
    updateAuth(null);
    localStorage.removeItem('user');

    await axios.post('/logout');
}