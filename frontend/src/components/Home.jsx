import React, { useState, useEffect } from "react";

const Home = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/hello")
            .then(res => res.json())
            .then(data => setUserData(data));
    }, []);

    return (
        <div>
            <h2>Home</h2>
            <p>{userData.message}</p>
        </div>
    );
};

export default Home;