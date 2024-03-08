import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext.jsx";

export default function RegisterAndLoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginOrRegister, setIsLoginOrRegister] = useState('login');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [error, setError] = useState(null); // State to store error message
  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);

  async function handleSubmit(ev) {
    ev.preventDefault();
    const url = isLoginOrRegister === 'register' ? 'register' : 'login';
    try {
      const { data } = await axios.post(url, { username, password });
      setLoggedInUsername(username);
      setId(data.id);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError('Username already exists. Please choose a different username.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  }

  return (
    <div className="bg-black h-screen flex items-center justify-center">
      <div className="bg-gray-900 text-black rounded-lg p-8 w-64">
        <h1 className="text-center mb-4 text-white text-lg font-bold leading-tight">Welcome to QuickConnect</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            value={username}
            onChange={ev => setUsername(ev.target.value)}
            type="text"
            placeholder="Username"
            className="block w-full rounded-sm p-2 mb-2 border"
          />
          <div className="relative">
            <input
              value={password}
              onChange={ev => setPassword(ev.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="block w-full rounded-sm p-2 mb-2 border"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-0 right-0 mt-2 mr-3 focus:outline-none"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              )}
            </button>
          </div>
          <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
            {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
          </button>
          <div className="text-center mt-2">
            {isLoginOrRegister === 'register' && (
              <div>
                Already a member?
                <button className="ml-1 text-white" onClick={() => setIsLoginOrRegister('login')}>
                  Login here
                </button>
              </div>
            )}
            {isLoginOrRegister === 'login' && (
              <div className="text-white">
                Don't have an account?
                <button className="ml-1 text-blue-500" onClick={() => setIsLoginOrRegister('register')}>
                  Register
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
