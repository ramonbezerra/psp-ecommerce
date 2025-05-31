import { useAuth } from '../provider/authProvider';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0ODY2MTY5OSwianRpIjoiYzdlN2ZmYTktZTQwNS00NjBmLTkxOTAtMDU4ZmQ3MTgzMzZlIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImFsaWNlIiwibmJmIjoxNzQ4NjYxNjk5LCJjc3JmIjoiNjZiNDkzYzctOGI0OC00NWEyLWFmMWItMWFmNGJlODU2YzhkIiwiZXhwIjoxNzQ4NjYyNTk5LCJyb2xlIjoiYWRtaW4ifQ.VsTnHoegFl0w_d9EiZpYF_YdHVlbAS0kSD59kF4e9vE'); // Replace with actual token logic
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
