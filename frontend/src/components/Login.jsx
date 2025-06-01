import { useAuth } from '../provider/authProvider';
import { useNavigate } from 'react-router-dom';
import { Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const LoginSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required'),
    password: Yup.string().min(4, 'Password must be at least 4 characters').max(120, 'Password must not exceed 120 characters')
        .required('Password is required')
});

const Login = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const handleLogin = ({ username, password }, { setSubmitting }) => {
        setSubmitting({ isValidating: true });
        axios.post('http://localhost:5000/auth/login', { username, password })
            .then(response => {
                setToken(response.data.access_token);
                setSubmitting({ isValidating: false });
                navigate('/dashboard');
            })
            .catch(error => {
                setSubmitting({ isValidating: false });
                console.error('Login failed:', error);
            });
    }

    return (
        <div>
            <h2 className='text-2xl'>Login</h2>
            <p>Enter your credentials to log in.</p>

            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}>
                    {({ handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">Username</label><br />
                                <Field
                                    type="text"
                                    name="username"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter your username"
                                />
                                <ErrorMessage name="username" component="span" className="error" />
                            </div>

                            <div>
                                <label htmlFor="password">Password</label><br />
                                <Field
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter your password"
                                />
                                <ErrorMessage name="password" component="span" className="error" />
                            </div>
                            <br />
                            <ErrorMessage name="general" component="span" className="error" />
                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type="submit" disabled={isSubmitting}>Login</button>
                        </form>
                    )}
            </Formik>
            <p className='mt-4'>Don't have an account? <a href="/register" className='text-blue-500 hover:text-blue-700'>Register here</a>.</p>
        </div>
    );
}

export default Login;
