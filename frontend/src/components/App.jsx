import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from '../provider/authProvider';

import ProtectedRoute from '../routes/ProtectedRoute';

import Home from './Home';
import Navbar from './Navbar';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';

const App = () => {
    return (
        <div>
            <h1 className='text-2xl'>PSP E-commerce</h1>
            <AuthProvider>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route element={<ProtectedRoute />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                        </Route>
                        <Route path="*" element={<div>NotFound</div>}/>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}

export default App;