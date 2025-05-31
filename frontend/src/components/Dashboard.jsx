import { useState, useEffect, useContext } from "react";

const Dashboard = () => {
    const [userData, setUserData] = useState({message: "Loading..."});

    useEffect(() => {
        fetch("http://localhost:5000/api/hello")
            .then(res => res.json())
            .then(data => setUserData(data));
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <p>{userData?.message}</p>
        </div>
    );
};

export default Dashboard;