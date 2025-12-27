import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Appcontext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';




export default Doctors

function Doctors() {
  const { docData, fetchAllDoctorsData } = useContext(Appcontext)
  const navigate = useNavigate()
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(docData.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(docData)
    }
  }

  useEffect(() => {
    fetchAllDoctorsData()
  }, [])

  useEffect(() => {
    applyFilter()
  }, [docData, speciality])

  return (
    <div>
      <p className='text-gray-600 font-medium m-5'>Browse through the doctors specialist.</p>

      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5 mx-5'>

        {/* Filters */}
        <div className={`flex flex-col gap-4 text-sm text-gray-600 w-full sm:w-64`}>
          <button onClick={() => setShowFilter(!showFilter)} className={`py-2 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-blue-600 text-white' : ''}`}>Filters</button>

          <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
            <p onClick={() => navigate('/doctors')} className={`w-full pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${!speciality ? "bg-indigo-100 text-black" : ""}`}>All doctors</p>
            {['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map((spec) => (
              <p key={spec} onClick={() => speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)} className={`w-full pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === spec ? "bg-indigo-100 text-black" : ""}`}>
                {spec}
              </p>
            ))}
          </div>
        </div>

        {/* Doctor Grid */}
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {
            filterDoc.map((item, index) => (
              <div onClick={() => navigate(`/appointment/${item._id}`)} key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                <img className='bg-blue-50' src={item.image} alt="" />
                <div className='p-4'>
                  <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                    <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                  </div>
                  <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                  <p className='text-gray-600 text-sm'>{item.speciality}</p>
                </div>
              </div>
            ))
          }
        </div>

      </div>
    </div>
  )
}
