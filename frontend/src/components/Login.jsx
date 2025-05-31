import { useAuth } from '../provider/authProvider';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        setToken('your-token-here'); // Replace with actual token logic
        navigate('/dashboard'); // Redirect to home after login
    }

    return (
        <div>
            <h2>Login</h2>
            <button type="button" onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
