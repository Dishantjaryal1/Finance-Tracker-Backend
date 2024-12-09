import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import LoadingBar from 'react-top-loading-bar';
import axios from 'axios';

document.title = 'SignUp';

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const ref = useRef(null);

  // Validation errors
  const [errors, setErrors] = useState({ username: "", email: "", password: "" });

  // Prevent login again if the user is already logged in
  useEffect(() => {
    if (localStorage.getItem("User")) {
      navigate("/");
    }
  }, [navigate]);

  // Helper to validate email format
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    let formErrors = { username: "", email: "", password: "" };
    let isValid = true;

    // Username validation
    if (!username.trim()) {
      formErrors.username = "Username is required.";
      isValid = false;
    } else if (!isNaN(username.trim())) {
      formErrors.username = "Username cannot be a number.";
      isValid = false;
    }

    // Email validation
    if (!email.trim() || !isValidEmail(email)) {
      formErrors.email = "A valid email is required.";
      isValid = false;
    }

    // Password validation
    if (!password.trim() || password.length < 6) {
      formErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    try {
      ref.current.staticStart();
      await axios.post('http://localhost:4000/auth/signup', {
        username,
        email,
        password,
      });
      toast.success("Registered Successfully!!");
      ref.current.complete();
      navigate("/login");
    } catch (error) {
      toast.error("Failed to register. Please try again.");
      console.log(error.message);
    }
  };

  return (
    <div className='bg-slate-800 w-screen h-screen flex justify-center items-center'>
      <LoadingBar color='orange' ref={ref} />

      <div className='flex flex-col gap-7 w-96 p-8 bg-white rounded-2xl shadow-lg'>
        <h1 className='text-4xl text-center font-bold text-slate-800'>SignUp</h1>

        <input
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`w-full h-12 pl-6 rounded-2xl transition-all outline-none focus:outline-none focus:ring-2 ${
            errors.username ? 'ring-red-500' : 'focus:ring-black'
          } border-2 border-transparent`}
        />
        {errors.username && <p className='text-red-500 text-sm'>{errors.username}</p>}

        <input
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full h-12 pl-6 rounded-2xl transition-all outline-none focus:outline-none focus:ring-2 ${
            errors.email ? 'ring-red-500' : 'focus:ring-black'
          } border-2 border-transparent`}
        />
        {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}

        <input
          placeholder='Password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full h-12 pl-6 rounded-2xl transition-all outline-none focus:outline-none focus:ring-2 ${
            errors.password ? 'ring-red-500' : 'focus:ring-black'
          } border-2 border-transparent`}
        />
        {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}

        <button
          onClick={submitForm}
          className='w-full h-12 justify-center text-lg rounded-2xl bg-yellow-600 text-center flex items-center font-bold'
        >
          Submit
        </button>

        <p className='text-center text-slate-800'>
          Already Registered? <a href='/login' className='text-yellow-600 underline'>Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
