import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext.jsx";

export default function RegisterAndLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginOrRegister, setIsLoginOrRegister] = useState('login');
    const [error, setError] = useState('');
    const { setLoggedInUsername, setId } = useContext(UserContext);

    async function handleSubmit(ev) {
        ev.preventDefault();
        const url = isLoginOrRegister === 'register' ? 'register' : 'login';
        try {
            const { data } = await axios.post(url, { username, password });
            setLoggedInUsername(username);
            setId(data.id);
        } catch (err) {
            setError(err.response.data.error);
        }
    }

    return (
        <div className="bg-black h-screen flex items-center">
            <form className="w-64 mx-auto mb-12 bg-gray-800 p-6 rounded-lg" onSubmit={handleSubmit}>
                <h2 className="text-white text-center mb-4 text-2xl">Welcome to QuickConnect</h2>
                <input
                    value={username}
                    onChange={ev => setUsername(ev.target.value)}
                    type="text"
                    placeholder="Username"
                    className="block w-full rounded-sm p-2 mb-2 border border-gray-700 bg-gray-900 text-white"
                />
                <input
                    value={password}
                    onChange={ev => setPassword(ev.target.value)}
                    type="password"
                    placeholder="Password"
                    className="block w-full rounded-sm p-2 mb-2 border border-gray-700 bg-gray-900 text-white"
                />
                <button className="bg-[#1e40af] text-white block w-full rounded-sm p-2">
                    {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
                </button>
                {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                <div className="text-center mt-2">
                    {isLoginOrRegister === 'register' && (
                        <div className="text-gray-300">
                            Already a member?
                            <button className="ml-1 text-[#1e40af]" onClick={() => setIsLoginOrRegister('login')}>
                                Login here
                            </button>
                        </div>
                    )}
                    {isLoginOrRegister === 'login' && (
                        <div className="text-gray-300">
                            Don't have an account?
                            <button className="ml-1 text-[#1e40af]" onClick={() => setIsLoginOrRegister('register')}>
                                Register
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}




app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
        const createdUser = await User.create({
            username: username,
            password: hashedPassword,
        });

        jwt.sign({ userId: createdUser._id, username }, jwtSecret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, { secure: true }).status(201).json({
                id: createdUser._id,
            });
        });
    } catch (err) {
        if (err) throw err;
    }
});