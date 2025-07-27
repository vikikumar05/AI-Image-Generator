import React, { useEffect, useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { use } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = () => {

    const [state, setState] = useState('Login');
    const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //used async becase we call here API
    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            //Functionallity for Login 
            if (state === 'Login') {
                //for calling the api we call axios
                const { data } = await axios.post(backendUrl + '/api/user/login', { email, password });

                if (data.success) {
                    setToken(data.token);
                    setUser(data.user);
                    localStorage.setItem('token', data.token);
                    setShowLogin(false);

                    
                } else {
                    toast.error(data.message || "Something went wrong");
                }
            } else { //Functionallity for User Registration
                const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password });

                if (data.success) {
                    setToken(data.token);
                    setUser(data.user);
                    localStorage.setItem('token', data.token);
                    setShowLogin(false);

                    toast.success("Account created successfully!");
                } else {
                    toast.error(data.message || "Something went wrong");
                }
            }

        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Something went wrong");

        }
    }

    //To disable the scrolling when the user is not login
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [])

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>

            <form onSubmit={onSubmitHandler} className='relative bg-white p-5 rounded-xl text-slate-500'>
                <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>

                <p className='text-sm'>Welcome back! Please sign in to continue</p>

                {state !== 'Login' && <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                    <img src={assets.user_icon} />
                    <input onChange={e => setName(e.target.value)} value={name} className='outline-none text-sm' type="text" placeholder='Full Name' required />
                </div>}

                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                    <img src={assets.lock_icon} />
                    <input onChange={e => setEmail(e.target.value)} value={email} className='outline-none text-sm' type="email" placeholder='Email ID' required />
                </div>

                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                    <img src={assets.user_icon} />
                    <input onChange={e => setPassword(e.target.value)} value={password} className='outline-none text-sm' type="password" placeholder='Password' required />
                </div>

                <p className='text-sm text-blue-800 my-4 cursor-pointer'>Forgot password</p>

                <button  className='bg-blue-950 w-full text-white py-2 rounded-full'>
                    {state === 'Login' ? 'login' : 'Create Account'}
                </button>

                {state === 'Login' ? <p className='mt-5 text-center'>Don't have an account? <span className='text-blue-700 cursor-pointer' onClick={() => setState('Sign Up')}>Sign Up</span></p>
                    :
                    <p className='mt-5 text-center'>Already have an account? <span className='text-blue-700 cursor-pointer' onClick={() => setState('Login')}>Login</span></p>}

                <img onClick={() => setShowLogin(false)} src={assets.cross_icon} className='absolute top-5 right-5 cursor-pointer' />
            </form>
        </div>
    )
}

export default Login
