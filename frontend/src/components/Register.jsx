import { useNavigate } from 'react-router-dom';
import { Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const RegisterSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required'),
    password: Yup.string().min(4, 'Password must be at least 4 characters').max(120, 'Password must not exceed 120 characters')
        .required('Password is required')
});

const Register = () => {
    const navigate = useNavigate();

    const handleRegister = ({ username, password }) => {
        axios.post('http://localhost:5000/auth/register', { username, password })
            .then(response => {
                navigate('/login'); // Redirect to login page after successful registration
            })
            .catch(error => {
                console.error('Registration failed:', error);
            });
    }

    return (
        <div>
            <h2 className='text-2xl'>Register</h2>
            <p>Enter your credentials to register.</p>

            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={RegisterSchema}
                onSubmit={handleRegister}>
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

            <p className='mt-4'>Already have an account? <a href="/login" className='text-blue-500 hover:text-blue-700'>Login</a></p>
        </div>
    );
}

export default Register;