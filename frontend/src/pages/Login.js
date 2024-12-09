import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import LoadingBar from 'react-top-loading-bar';

document.title = 'Login';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const ref = useRef(null);

  // Prevent login again if the user is already logged in
  useEffect(() => {
    if (localStorage.getItem("User")) {
      navigate("/");
    }
  }, [navigate]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      ref.current.staticStart();
      const response = await axios.post('http://localhost:4000/auth/login', {
        email,
        password
      });
      if (response.data.statusCode !== 201) {
        toast.error(response.data.message);
        return;
      }
      toast.success("Successfully Logged In !!");
      localStorage.setItem('User', JSON.stringify(response.data.message));
      ref.current.complete();
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='bg-slate-800 w-screen h-screen flex justify-center items-center'>
      <LoadingBar color='orange' ref={ref} />

      <div className='flex flex-col gap-7 w-96 p-8 bg-white rounded-2xl shadow-lg'>
        <h1 className='text-4xl text-center font-bold text-slate-800'>Login</h1>

        <input
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
          className='w-full h-12 pl-6 rounded-2xl transition-all outline-none focus:outline-none focus:ring-2 focus:ring-black focus:border-black hover:border-black border-2 border-transparent'
        />
        
        <input
          placeholder='Password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          className='w-full h-12 pl-6 rounded-2xl outline-none transition-all focus:outline-none focus:ring-2 focus:ring-black focus:border-black hover:border-black border-2 border-transparent'
        />

        <button
          onClick={submitForm}
          className='w-full h-12 justify-center text-lg rounded-2xl bg-yellow-600 text-center flex items-center font-bold'
        >
          Submit
        </button>

        <p className='text-center text-slate-800'>
          New User? Go To <a href='/signup' className='text-yellow-600'>SignUp</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
