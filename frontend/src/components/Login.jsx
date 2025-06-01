import { useAuth } from '../provider/authProvider';
import { useNavigate } from 'react-router-dom';
import { Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const LoginSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required'),
    password: Yup.string().min(4, 'Password must be at least 6 characters').max(120, 'Password must not exceed 120 characters')
        .required('Password is required')
});

const Login = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        // setNestedObjectValues({ isValidating: true });
        axios.post('http://localhost:5000/auth/login', { username: 'alice', password: 'admin' })
            .then(response => {
                setToken(response.data.access_token);
                // setNestedObjectValues({ isValidating: false });
                navigate('/dashboard');
            })
            .catch(error => {
                // setNestedObjectValues({ isValidating: false });
                console.error('Login failed:', error);
            });
    }

    return (
        <div>
            <h2>Login</h2>
            <button type="button" onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
