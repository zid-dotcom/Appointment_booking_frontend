import React, { useContext } from 'react'
import { Appcontext } from '../context/AppContext'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useEffect } from 'react'




function MyAppointments() {
  // const { doctors } = useContext(Appcontext)
  const { token, backend_URL, fetchAllDoctorsData } = useContext(Appcontext)

  const [Appointment, SetAppointment] = useState([])



  // cancel appointment Api and functionality


  const handleCancelappointment = async (appointmentId) => {
    try {
      const response = await axios.put(`${backend_URL}/cancel`, { appointmentId }, { headers: { token } })
      console.log(response);
      toast.success(response.data)
      console.log(appointmentId);

      await fetchMyappointmentData()      // refresh appointments
      await fetchAllDoctorsData()





    }
    catch (err) {
      console.log(err.response.data);
      toast.error(err.response.data)

    }



  }


  const initPay = (order) => {

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,


      handler: async (response) => {
        console.log(response);

        try {
          const verifyRes = await axios.post(`${backend_URL}/verifyrazorpay`, response, { headers: { token } })
          console.log(verifyRes);
          toast.success(verifyRes.data.message)
          fetchMyappointmentData()



        }
        catch (err) {
          console.log(err);
          toast.error(err.message)


        }


      }

    }

    const rzp = new window.Razorpay(options)
    rzp.open()

  }


  const handleRazerpaymentIntegration = async (appointmentId) => {
    try {
      const response = await axios.post(`${backend_URL}/payment`, { appointmentId }, { headers: { token } })
      console.log(response.data);

      initPay(response.data.order)


    }
    catch (err) {
      console.log(err.response.data);
      toast.error(err.response.data)

    }

  }




  const fetchMyappointmentData = async () => {
    try {
      // const {data} = await axios.get(`${backend_URL}/listappointments`, { headers: { token } })

      // console.log(data);
      // SetAppointment(data)

      const response = await axios.get(`${backend_URL}/listappointments`, { headers: { token } })

      console.log(response);
      SetAppointment(response.data)





    }
    catch (err) {
      console.log(err);
      toast.error(err.response.data)

    }
  }

  useEffect(() => {
    fetchMyappointmentData()
  }, [])

  return (
    <div className='px-4 sm:px-12 mt-12'>

      <p className='m-2 p-2 font-medium text-zinc-600 border-b border-gray-400 '>My appointments</p>
      <div>
        {
          Appointment.map((item, index) => (
            <div key={item._id} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b border-gray-100'>
              <div className='w-32 bg-indigo-50'>
                <img className='w-full h-full object-cover' src={item.docData.image} alt="" />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold text-lg'>{item.docData.name}</p>
                <p className='text-zinc-700 font-medium mt-1'>{item.docData.speciality}</p>

                <p className='text-zinc-700 font-medium mt-4'>Address:</p>
                <p className='text-xs sm:text-sm mt-1'>{item.docData.address.line1}</p>
                <p className='text-xs sm:text-sm'>{item.docData.address.line2}</p>

                <p className='mt-4 text-xs sm:text-sm font-medium text-zinc-700'>
                  Date & time: <span className='text-gray-500 font-normal ml-1'>{new Date(item.date).toLocaleDateString()} | {item.slotTime}</span>
                </p>
              </div>

              <div className='flex flex-col gap-2 justify-end sm:justify-center w-full sm:w-48 col-span-2'>
                {
                  !item.cancelled && item.payment &&
                  <button className='text-stone-500 bg-indigo-50 border border-indigo-500 rounded sm:min-w-48 py-2'>Paid</button>
                }

                {!item.cancelled && !item.payment && <button onClick={() => handleRazerpaymentIntegration(item._id)} className='text-sm text-stone-500 text-center border rounded hover:bg-blue-600 hover:text-white transition-all duration-300 py-2 sm:min-w-48'>
                  Pay Online
                </button>
                }

                {!item.cancelled && !item.payment && <button onClick={() => handleCancelappointment(item._id)} className='text-center text-sm text-stone-500 border rounded hover:bg-red-600 hover:text-white transition-all duration-300 py-2 sm:min-w-48'>
                  Cancel Appointment
                </button>}

                {item.cancelled && <button className='text-red-500 border border-red-500 rounded py-2 sm:min-w-48'>Appointment Cancelled</button>
                }
              </div>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default MyAppointments
