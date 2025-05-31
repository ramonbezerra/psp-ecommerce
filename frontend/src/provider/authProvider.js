import axios from 'axios';
import { useEffect, useState, createContext, useContext, useMemo } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken_] = useState(localStorage.getItem('token') || null);

    const setToken = (newToken) => {
        setToken_(newToken);
    };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = token;
            localStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common['Authorization']
            localStorage.setItem('token', token);
        }
    }, [token]);

    const value = useMemo(() => ({ token, setToken }), [token]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthProvider;
