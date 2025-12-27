
import React, { use, useContext, useState } from 'react'
import { Appcontext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react'



function Login() {
    const nav=useNavigate()

    const { token, settoken, backend_URL } = useContext(Appcontext)
    const [authstate, setauthstate] = useState(true)
    const [userData, setuserData] = useState({
        name: "",
        email: "",
        password: ""
    })




    const handleReg = async () => {
        try {
            const { name, email, password } = userData
            if (!name || !email || !password) {
                toast.error('enter valid inputs')
            }
            else {
                const response = await axios.post(`${backend_URL}/reg`, userData)

                console.log(response);
                if(response.status==201){
                    toast.success('Registered successfully')
                    setauthstate(false)

                }
                else{
                    toast.error('something went wrong')
                }


            }



        }
        catch (err) {
            console.log(err.response.data);
            toast.error(err.response.data)




        }
    }

    const handleLogin = async () => {
        try {
            const { email, password } = userData
            if (!email || !password) {
                toast.error('Enter valid inputs')
            }
            else {
                const response = await axios.post(`${backend_URL}/login`,userData)
                console.log(response);
                if(response.status==201){
                    localStorage.setItem('token',response.data.token)
                    settoken(response.data.token)
                    toast.success('Login successfully')

                }
                else{
                    toast.error('something went wrong')
                }
                


            }

        }
        catch (err) {
            console.log(err);


        }
    }



    const handleauth = () => {
        setauthstate(!authstate)
    }


    // after logged in  redirect to landing page

    useEffect(()=>{
        if(token){
            nav('/')
            

        }
    })
    return (
        <div>

            <main className="flex items-center justify-center w-full px-4">
                <div className="flex w-full flex-col max-w-96">

                    <a href="https://prebuiltui.com" className="mb-8" title="Go to PrebuiltUI">

                    </a>

                    <h2 className="text-4xl font-medium text-gray-900">{authstate ? 'signup' : 'signin'}</h2>

                    <p className="mt-4 text-base text-gray-500/90">
                        {
                            authstate ?
                                'please enter username email and password for creating new account'
                                :
                                ' Please enter email and password to access.'
                        }
                    </p>
                    {
                        authstate &&
                        <div className="mt-10">
                            <label className="font-medium">username</label>
                            <input onChange={(e) => setuserData({ ...userData, name: e.target.value })}
                                placeholder="Please enter your username"
                                className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
                                required
                                type="text"
                                name="username"
                            />
                        </div>
                    }



                    <div className="mt-10">
                        <label className="font-medium">Email</label>
                        <input  onChange={(e)=>setuserData({...userData,email:e.target.value})}
                            placeholder="Please enter your email"
                            className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
                            required
                            type="email"
                            name="email"
                        />
                    </div>

                    <div className="mt-6">
                        <label className="font-medium">Password</label>
                        <input onChange={(e)=>setuserData({...userData,password:e.target.value})}
                            placeholder="Please enter your password"
                            className="mt-2 rounded-md ring ring-gray-200 focus:ring-2 focus:ring-indigo-600 outline-none px-3 py-3 w-full"
                            required
                            type="password"
                            name="password"
                        />
                    </div>
                    {
                        authstate ?
                            <button onClick={handleReg}
                                type="button"
                                className="mt-8 py-3 w-full cursor-pointer rounded-md bg-indigo-600 text-white transition hover:bg-indigo-700"
                            >
                                Register
                            </button>
                            :
                            <button onClick={handleLogin}
                                type="button"
                                className="mt-8 py-3 w-full cursor-pointer rounded-md bg-indigo-600 text-white transition hover:bg-indigo-700"
                            >
                                Login
                            </button>

                    }




                    <p className='text-center mt-5'>  {authstate ? 'Already a user ?' : 'Dont have an account?'} <button onClick={handleauth}>sign up</button></p>
                </div>
            </main>

        </div>
    )
}

export default Login
