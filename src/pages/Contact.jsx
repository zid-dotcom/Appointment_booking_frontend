


import React from 'react'
import { assets } from '../assets/assets'

function Contact() {
  return (
    <div className="pt-10 px-5 md:px-10">
      {/* Heading */}
      <div>
        <p className="text-center text-2xl text-gray-500">
          CONTACT <span className="text-gray-700 font-semibold">US</span>
        </p>
      </div>

      {/* Content */}
      <div className="mt-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10">
        
        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <img
            className="w-60 md:w-72 rounded-xl"
            src={assets.contact_image}
            alt="Contact"
          />
        </div>

        {/* Text + Button */}
        <div className="w-full md:w-1/2 text-center md:text-left text-gray-600">
          <p className="text-xl font-semibold text-gray-700 mb-2">
            OUR OFFICE
          </p>

          <p className="text-sm md:text-base">
            00000 Willms Station<br />
            Suite 000, Washington, USA
          </p>

          <div className="mt-4 text-sm md:text-base">
            <p>
              Tel: (000) 000-0000 <br />
              Email: greatstackdev@gmail.com
            </p>
          </div>

          <p className="text-xl text-gray-700 mt-6 font-semibold">
            CAREERS AT PRESCRIPTO
          </p>

          <p className="text-sm text-gray-500 mt-2">
            Learn more about our teams and job openings.
          </p>

          <div className="mt-5">
            <button className="border border-gray-800 px-6 py-2 text-sm  rounded-full hover:bg-black hover:text-white transition-colors">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact

