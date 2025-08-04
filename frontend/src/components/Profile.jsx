import { useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
    const [error, setError] = useState(null);

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
                </div>
            </div>
        </section>
    );
};

export default Profile;