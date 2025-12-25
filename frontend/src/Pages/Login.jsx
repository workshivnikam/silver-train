import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currState, setCurrState] = useState("Login");
  const [errors, setErrors] = useState(false);
  const { navigate, setToken, token, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginInputData = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let schema;
      let newURL = backendUrl;

      if (currState === "Sign Up") {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message);
        }

      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message);
        }

      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)

    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col text-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-700'
    >
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {currState === "Sign Up" && (
        <>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            name='name'
            type='text'
            className='w-full px-3 py-2 border border-gray-800'
            placeholder='Name'
          />
          {errors.name && (
            <p className='text-red-600 text-start text-xs font-semibold'>
              {errors.name}
            </p>
          )}
        </>
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        name='email'
        type='email'
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Email'
      />
      {errors.email && (
        <p className='text-red-600 text-xs text-start font-semibold'>
          {errors.email}
        </p>
      )}
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        name='password'
        type='password'
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Password'
      />
      {errors.password && (
        <p className='text-red-600 text-xs text-start font-semibold'>
          {errors.password}
        </p>
      )}

      <div className='w-full flex justify-between text-sm -mt-2'>
        <p className='cursor-pointer'>forgot your password</p>
        {currState === "Sign Up" ? (
          <p onClick={() => setCurrState("Login")} className='cursor-pointer'>
            Login here
          </p>
        ) : (
          <p onClick={() => setCurrState("Sign Up")} className='cursor-pointer'>
            Create account
          </p>
        )}
      </div>

      <button className='w-full px-3 font-light py-2 border bg-gray-800 text-white'>
        {currState === "Sign Up" ? "Sign up" : "Login"}
      </button>
    </form>
  );
};

export default Login;
