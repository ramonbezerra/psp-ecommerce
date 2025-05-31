import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../provider/authProvider';

const Navbar = () => {
    const { token, setToken } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        setToken(null);
        navigate('/'); // Redirect to home after logout
    };

    return (
        <nav className='bg-gray-600 text-white p-4'>
            <ul>
                <li><Link to="/">Home</Link></li>
                {token != null ? (
                    <>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><button type="button" onClick={handleLogout}>Logout</button></li>
                    </>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;