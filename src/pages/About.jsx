

import React, { useContext } from 'react'
import { Appcontext } from '../context/AppContext'

function About() {
  const { assets } = useContext(Appcontext)

  return (
    <div className="pt-10 px-5 md:px-10">

      {/* Heading */}
      <div className="text-center text-2xl text-gray-500 mb-10">
        <p>
          ABOUT <span className="text-gray-700 font-semibold">US</span>
        </p>
      </div>

      {/* About Content */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-5xl mx-auto">
        
        {/* Image */}
        <div className="md:w-1/3 flex justify-center">
          <img className="w-60 md:w-72 rounded-xl" src={assets.about_image} alt="About" />
        </div>

        {/* Text */}
        <div className="md:w-[55%] text-gray-600 leading-7 text-justify">
          <p className="mb-4">
            Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently
            and efficiently. At Prescripto, we understand the challenges individuals face when it comes
            to scheduling doctor appointments and managing their health records.
          </p>

          <p className="mb-4">
            Prescripto is committed to excellence in healthcare technology. We continuously strive
            to enhance our platform, integrating the latest advancements to improve user experience
            and deliver superior service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the way.
          </p>

          <h2 className="font-bold text-gray-700 text-lg mb-2">Our Vision</h2>

          <p>
            Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim
            to bridge the gap between patients and healthcare providers, making it easier for you to
            access the care you need, when you need it.
          </p>
        </div>

      </div>

      {/* WHY CHOOSE US Section */}
      <div className="max-w-6xl mx-auto mt-20">
        <h2 className="text-xl font-semibold mb-6 text-gray-700">WHY CHOOSE US</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border border-gray-200 rounded-xl p-8 text-gray-600 hover:bg-blue-500 hover:text-white ">
          
          {/* Efficiency */}
          <div>
            <h3 className="font-bold mb-2">EFFICIENCY:</h3>
            <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>

          {/* Convenience */}
          <div>
            <h3 className="font-bold mb-2">CONVENIENCE:</h3>
            <p>Access to a network of trusted healthcare professionals in your area.</p>
          </div>

          {/* Personalization */}
          <div>
            <h3 className="font-bold mb-2">PERSONALIZATION:</h3>
            <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
          </div>

        </div>
      </div>

     

    </div>
   
  )
}

export default About
