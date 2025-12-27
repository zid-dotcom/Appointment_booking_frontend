

import React, { useContext } from 'react'
import { Appcontext } from '../context/AppContext'

import { Link } from 'react-router-dom'


function Footer() {
    const { assets } = useContext(Appcontext)

    return (
        <div className="mx-4 md:mx-10 mt-40">

            {/* --- Top Footer: 3 Columns --- */}
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm" >

                {/* Left section */}
                <div>
                    <img className="w-40 mb-5" src={assets.logo} alt="" />
                    <p className="w-full md:w-2/3 text-gray-600 leading-6">
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard dummy text
                        ever since the 1500s.
                    </p>
                </div>

                {/* Center section */}
                <div>
                    <p className="text-xl font-medium mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <Link to={'/'}>
                            <li>Home</li>
                        </Link>
                        <Link to={'/about'}>
                            <li>About us</li>
                        </Link>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>

                {/* Right section */}
                <div>
                    <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li>+0-000-000-000</li>
                        <li>greatstackdev@gmail.com</li>
                    </ul>
                </div>

            </div>

            {/* --- Bottom copyright --- */}
            <div className="mt-10">
                <hr className="border-gray-300 mb-4" />
                <p className="text-center text-sm text-gray-500">
                    Copyright 2024 © Greatstack.dev - All Rights Reserved.
                </p>
            </div>
        </div>
    )
}

export default Footer
