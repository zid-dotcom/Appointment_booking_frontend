import React from 'react'
import Header from '../components/Header'
import Specilaitymenu from '../components/Specilaitymenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import { useContext } from 'react'
import { Appcontext } from '../context/AppContext'

function Home() {
  const { userData, token } = useContext(Appcontext)

  return (
    <div>
      {
        token &&
        <div className='flex justify-end mx-4 sm:mx-[10%] mt-4'>
          <p className="text-xl sm:text-2xl text-blue-500" >Hii <span className="text-gray-500">{userData.name}</span></p>


        </div>
      }


      <Header />
      <Specilaitymenu />
      <TopDoctors />
      <Banner />

    </div>
  )
}

export default Home
