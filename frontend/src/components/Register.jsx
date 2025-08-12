import { useNavigate } from 'react-router-dom';
import { Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    username: Yup.string()
        .required('Username is required'),
    password: Yup.string()
        .min(4, 'Password must be at least 4 characters')
        .max(120, 'Password must not exceed 120 characters')
        .required('Password is required')
});

const Register = () => {
    const navigate = useNavigate();

    const handleRegister = ({ username, password }, { setSubmitting }) => {
        setSubmitting({ isValidating: true });
        axios.post('http://localhost:5000/auth/register', { username, password })
            .then(response => {
                setSubmitting({ isValidating: false });
                navigate('/login');
            })
            .catch(error => {
                setSubmitting({ isValidating: false });
                console.error('Registration failed:', error);
            });
    }

    return (
        <section className="">
            <div className="">
                <div className="lg:w-[88%] sm:w-[88%] w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center bg-gray-100">
                    <div className="items-center text-gray-600 p-4">
                        <h1 className="lg:text-3xl md:text-2xl text-xl">Register</h1>
                        <p>Enter your credentials to register.</p>
                    </div>

                    <Formik
                        initialValues={{ username: '', password: '', email: '' }}
                        validationSchema={RegisterSchema}
                        onSubmit={handleRegister}>
                        {({ handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                            <form onSubmit={handleSubmit}>
                                <div className='mb-4'>
                                    <label htmlFor="email">Email
                                    <ErrorMessage name="email" component="span" className="text-red-500 ml-4" />
                                    <Field
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Enter your email"
                                        className="form-control block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                    />
                                    </label>
                                </div>
                                
                                <div className='mb-4'>
                                    <label htmlFor="username">Username
                                    <ErrorMessage name="username" component="span" className="text-red-500 ml-4" />
                                    <Field
                                        type="text"
                                        name="username"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Choose an username"
                                        className="form-control block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                    />
                                    </label>
                                </div>

                                <div className='mb-4'>
                                    <label htmlFor="password">Password
                                    <ErrorMessage name="password" component="span" className="text-red-500 ml-4" />
                                    <Field
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Enter your password"
                                        className="form-control block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                    />
                                    </label>
                                </div>

                                
                                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type="submit" disabled={isSubmitting}>Login</button>
                            </form>
                        )}
                    </Formik>

                    <p className='mt-4'>Already have an account? <a href="/login" className='text-blue-500 hover:text-blue-700'>Login</a></p>
                </div>
            </div>
        </section>
    );
}

export default Register;