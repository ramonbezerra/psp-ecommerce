import { useEffect, useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

const ProfileSchema = Yup.object().shape({
    fullname: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    gender: Yup.string().required("Gender is required"),
    dateOfBirth: Yup.date().required("Date of birth is required").min(new Date(1900, 0, 1), "Date of birth must be after 01/01/1900").max(new Date(), "Date of birth must be before today's date"),
    cpf: Yup.string().min(11, "CPF must be 11 digits").max(11, "CPF must be 11 digits").required("CPF is required"),
    phone: Yup.string().required("Phone is required").min(11, "Phone must be 11 digits").max(11, "Phone must be 11 digits"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
    postalCode: Yup.string().required("Postal code is required"),
});

const Profile = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/profile')
            .then(response => {
                setUserData(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch user info:', error);
                setError('Failed to fetch user info. Try again.');
            });
    }, []);

    const handleProfile = (values, { setSubmitting }) => {
        setSubmitting({ isValidating: true });
        axios.put('http://localhost:5000/api/profile', values)
            .then(response => {
                setSuccess(response.data.message);
                setSubmitting({ isValidating: false });
            })
            .catch(error => {
                setSubmitting({ isValidating: false });
                console.error('Profile update failed:', error.data?.message);
                setError('Profile update failed. Try again.');
            });
    };

    return (
        <section className="">
            <div className="">
                <div className="lg:w-[88%] sm:w-[88%] w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center bg-gray-100">
                    <div className="items-center text-gray-600 p-4 flex justify-between">
                        <h1
                            className="lg:text-3xl md:text-2xl text-xl">
                            Profile
                        </h1>
                        <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><Link to="/change-password">Alterar Senha</Link></button>
                    </div>
                    {error && <div className="text-red-500 mb-2">{error}</div>}

                    {userData && <Formik enableReinitialize initialValues={{ fullname: userData?.fullname, email: userData?.email, gender: userData?.gender, dateOfBirth: new Date(userData?.dateOfBirth).toISOString().split('T')[0], cpf: userData?.cpf, phone: userData?.phone, address: userData?.address, city: userData?.city, state: userData?.state, country: userData?.country, postalCode: userData?.postalCode }} onSubmit={handleProfile} validationSchema={ProfileSchema}>
                        {({ handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="fullname">Name
                                        <ErrorMessage name="fullname" component="span" className="text-red-500 ml-4" /><br />
                                        <Field
                                            type="text"
                                            className="form-control block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                            name="fullname"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Enter your fullname"
                                        />
                                    </label>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email">Email
                                        <ErrorMessage name="email" component="span" className="text-red-500 ml-4" /><br />
                                        <Field
                                            type="email"
                                            className="form-control block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                            name="email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Enter your email"
                                        />
                                    </label>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="gender">Gender</label>
                                    <ErrorMessage name="gender" component="span" className="text-red-500 ml-4" /><br />
                                    <label>
                                        <Field
                                            type="radio"
                                            className=""
                                            name="gender"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value="male"
                                        />
                                        Male
                                    </label>
                                    <label>
                                        <Field
                                            type="radio"
                                            className=""
                                            name="gender"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value="female"
                                        />
                                        Female
                                    </label>
                                    <label>
                                        <Field
                                            type="radio"
                                            className=""
                                            name="gender"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value="other"
                                        />
                                        Other
                                    </label>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="dateOfBirth">Date of Birth
                                        <ErrorMessage name="dateOfBirth" component="span" className="text-red-500 ml-4" /><br />
                                        <Field
                                            type="date"
                                            className="form-control block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                            name="dateOfBirth"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </label>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="cpf">CPF
                                        <ErrorMessage name="cpf" component="span" className="text-red-500 ml-4" /><br />
                                        <Field
                                            type="text"
                                            className="form-control block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                            name="cpf"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="e.g.: 999.999.999-99"
                                        />
                                    </label>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="phone">Phone
                                        <ErrorMessage name="phone" component="span" className="text-red-500 ml-4" /><br />
                                        <Field
                                            type="text"
                                            className="form-control block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                            name="phone"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="e.g.: (99) 99999-9999"
                                        />
                                    </label>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="postalCode">Postal Code
                                        <ErrorMessage name="postalCode" component="span" className="text-red-500 ml-4" /><br />
                                        <Field
                                            type="text"
                                            className="form-control block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                            name="postalCode"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="e.g.: 99999-999"
                                        />
                                    </label>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="address">Address
                                        <ErrorMessage name="address" component="span" className="text-red-500 ml-4" /><br />
                                        <Field
                                            type="text"
                                            className="form-control block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                            name="address"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Enter your address"
                                        />
                                    </label>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="city">City</label>
                                    <ErrorMessage name="city" component="span" className="text-red-500 ml-4" /><br />
                                    <Field
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                        name="city"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Enter your city"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="state">State</label>
                                    <ErrorMessage name="state" component="span" className="text-red-500 ml-4" /><br />
                                    <Field
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                        name="state"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Enter your state"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="country">Country</label>
                                    <ErrorMessage name="country" component="span" className="text-red-500 ml-4" /><br />
                                    <Field
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                        name="country"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Enter your country"
                                    />
                                </div>
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={isSubmitting}>Save</button>
                            </form>
                        )}
                    </Formik>}
                </div>
            </div>
        </section>
    );
};

export default Profile;