import React, {useEffect, useState, useContext} from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Login = () => {

    const [state, setState] = useState('Login');
    const {setShowLogin} = useContext(AppContext);

    //To disable the scrolling when the user is not login
    useEffect(()=> {
        document.body.style.overflow = 'hidden';
        return ()=>{
            document.body.style.overflow = 'unset';
        }
    },[])

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>

            <form className='relative bg-white p-5 rounded-xl text-slate-500'>
                <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>

                <p className='text-sm'>Welcome back! Please sign in to continue</p>

                {state !== 'Login' && <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                    <img src={assets.user_icon} />
                    <input className='outline-none text-sm' type="text" placeholder='Full Name' required />
                </div>}

                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                    <img src={assets.lock_icon} />
                    <input className='outline-none text-sm' type="email" placeholder='Email ID' required />
                </div>

                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                    <img src={assets.user_icon} />
                    <input className='outline-none text-sm' type="password" placeholder='Password' required />
                </div>

                <p className='text-sm text-blue-800 my-4 cursor-pointer'>Forgot password</p>

                <button className='bg-blue-950 w-full text-white py-2 rounded-full'>
                    {state  === 'Login' ? 'login' : 'Create Account'}
                </button>

                {state === 'Login' ? <p className='mt-5 text-center'>Don't have an account? <span className='text-blue-700 cursor-pointer' onClick={()=>setState('Sign Up')}>Sign Up</span></p>
                :
                <p className='mt-5 text-center'>Already have an account? <span className='text-blue-700 cursor-pointer' onClick={()=>setState('Login')}>Login</span></p>}

                <img onClick={()=> setShowLogin(false)} src={assets.cross_icon} className='absolute top-5 right-5 cursor-pointer'/>
            </form>
        </div>
    )
}

export default Login
