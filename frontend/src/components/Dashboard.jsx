import { useState, useEffect, useContext } from "react";
import axios from "axios";

const Dashboard = () => {
    // const { token, setToken } = useAuth();
    const [userData, setUserData] = useState({message: "Loading..."});

    useEffect(() => {
        axios.get("http://localhost:5000/api/hello")
            .then(res => setUserData(res.data));
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <p>{userData?.message}</p>
        </div>
    );
};

export default Dashboard;