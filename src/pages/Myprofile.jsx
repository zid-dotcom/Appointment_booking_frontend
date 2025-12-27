import React, { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { Appcontext } from '../context/AppContext'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'


function Myprofile() {

  const { userData, setUserData, token, loadUserProfileData, backend_URL } = useContext(Appcontext)




  // useEffect(()=>{
  //     if(token){
  //         loadUserProfileData()
  //     }
  //     else{
  //         setUserData
  //     }

  // },[token])


  const [isEdit, setisEdit] = useState(false)
  const [image, setImage] = useState(false)

  const updateUserprofileData = async () => {
    try {
      const formData = new FormData()

      formData.append('name', userData.name)
      formData.append('email', userData.email)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)
      formData.append('phone', userData.phone)


      image && formData.append('image', image)

      const response = await axios.put(`${backend_URL}/updateprofile`, formData, { headers: { token } })
      console.log(response);
      if (response.status == 201) {
        toast.success('profile updated successfully')
        await loadUserProfileData()
        setisEdit(false)
        setImage(false)
      }
      else {
        toast.error(err.response.data)
      }






    }
    catch (err) {
      console.log(err.response.data);
      toast.error(err.response.data)


    }






  }
  return (
    <div className='max-w-lg mx-auto flex flex-col gap-2 text-sm pt-5 px-4 sm:px-0'>

      {
        isEdit ?
          <label htmlFor="image">
            <div className='inline-block relative cursor-pointer'>
              <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
              <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
            </div>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden />
          </label>
          :
          <img className='w-36 rounded' src={userData.image} alt="" />
      }

      {
        isEdit ?
          <input value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type="text" />
          :
          <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      }

      <hr className='bg-zinc-400 h-[1px] border-none' />
      <div>
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email id:</p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {
            isEdit ?
              <input value={userData.phone} onChange={(e) => setUserData({ ...userData, phone: e.target.value })} className='bg-gray-100 max-w-52' type="text" />
              :
              <p className='text-blue-400'>{userData.phone}</p>
          }
          <p className='font-medium'>Address:</p>
          {
            isEdit ?
              <p>
                <input value={userData.address?.line1 || ''} onChange={(e) => setUserData({ ...userData, address: { ...userData.address, line1: e.target.value } })} className='bg-gray-50' type="text" />
                <br />
                <input value={userData.address?.line2 || ''} onChange={(e) => setUserData({ ...userData, address: { ...userData.address, line2: e.target.value } })} className='bg-gray-50' type="text" />
              </p>
              :
              <p className='text-gray-500'>
                {userData.address?.line1}
                <br />
                {userData.address?.line2}
              </p>
          }

        </div>
      </div>

      <div>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {
            isEdit ?
              <select className='max-w-20 bg-gray-100' value={userData.gender} onChange={(e) => setUserData({ ...userData, gender: e.target.value })} >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              :
              <p className='text-gray-400'>{userData.gender}</p>
          }
          <p className='font-medium'>Birthday:</p>
          {
            isEdit ?
              <input className='max-w-28 bg-gray-100' type="date" value={userData.dob} onChange={(e) => setUserData({ ...userData, dob: e.target.value })} />
              :
              <p className='text-gray-400'>{userData.dob}</p>
          }
        </div>
      </div>

      <div className='mt-10'>
        {
          isEdit ?
            <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={updateUserprofileData} >Save information</button>
            :
            <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={() => setisEdit(true)} >Edit</button>
        }
      </div>


    </div>

  )
}

export default Myprofile
