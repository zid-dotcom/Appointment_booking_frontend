



// import React, { useContext, useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { Appcontext } from '../context/AppContext'
// import { assets } from '../assets/assets'
// import RelatedDoctors from '../components/RelatedDoctors'
// import { toast } from 'react-toastify'
// import axios from 'axios'




// function Appointment() {
//   const nav=useNavigate()
//   const { docId } = useParams()
//   const { docData,setDocData, currencysymbol,fetchAllDoctorsData,token,  backend_URL } = useContext(Appcontext)

//   const daysofWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

//   const [docInfo, setDocInfo] = useState(null)
//   const [docslots, setDocslots] = useState([])
//   const [slotIndex, setSlotIndex] = useState(0)
//   const [slotTime, setSlotTime] = useState('')

//   const bookingAppointment=async()=>{
//       if(!token){
//         toast.warn('Login to Book appointment ')
//         return   nav('/login')
//       }
//     try{
//       const date=docslots[slotIndex][0].datetime
//       let day=date.getDate()
//       let month=date.getMonth()+1
//       let year=date.getFullYear()
//       const slotDate=day+"_"+month+"_"+year
//       console.log(slotDate);
//       const response=await  axios.post(`${backend_URL}/bookappointment`,{docId,slotDate,slotTime},{headers:{token}})
//       console.log(response);
//       if(response.status==201){
//         toast.success('Doctor booked successfully')
//         fetchAllDoctorsData()
//         nav('/my-appointment')


//       }
//       else{
//         toast.error(response.data)
//       }
      

      







//     }
//     catch(err){
//       console.log(err);
//       toast.error(err.response.data)
      
//     }
//   }

//   useEffect(()=>{
//     fetchAllDoctorsData()
//   },[])


//   // Get doctor info from context
//   useEffect(() => {
//     if (!docData || docData.length === 0) return

//     const foundDoc = docData.find(doc => doc._id === docId)
//     setDocInfo(foundDoc || null)
//   }, [docData, docId])

//   // Generate 7 days of available slots (10:00–21:00, 30 min interval)
//   useEffect(() => {
//     if (!docInfo) return

//     const generateSlots = () => {
//       const today = new Date()
//       const allSlots = []

//       for (let i = 0; i < 7; i++) {
//         let currentDate = new Date(today)
//         currentDate.setDate(today.getDate() + i)

//         let endTime = new Date(today)
//         endTime.setDate(today.getDate() + i)
//         endTime.setHours(21, 0, 0, 0) // 9 PM

//         // Start time logic
//         if (today.getDate() === currentDate.getDate()) {
//           const currentHour = currentDate.getHours()
//           currentDate.setHours(currentHour > 10 ? currentHour + 1 : 10)
//           currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
//         } else {
//           currentDate.setHours(10, 0, 0, 0) // 10 AM
//         }

//         const daySlots = []
//         while (currentDate < endTime) {
//           daySlots.push({
//             datetime: new Date(currentDate),
//             time: currentDate.toLocaleTimeString([], {
//               hour: '2-digit',
//               minute: '2-digit',
//             }),
//           })
//           currentDate.setMinutes(currentDate.getMinutes() + 30)
//         }

//         allSlots.push(daySlots)
//       }

//       setDocslots(allSlots)
//       setSlotIndex(0)
//       setSlotTime(allSlots[0]?.[0]?.time || '')
//     }

//     generateSlots()
//   }, [docInfo])

//   if (!docInfo) {
//     return (
//       <div className="text-center py-10 text-gray-600">
//         Loading doctor details...
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
//       {/* Top: Doctor Info Section */}
//       <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-start">
//         {/* Doctor Image */}
//         <div className="bg-blue-500 rounded-2xl p-3  self-center md:self-start">
//           <img
//             src={docInfo.image}
//             alt={docInfo.name}
//             className="w-40 h-40 sm:w-52 sm:h-52 md:w-56 md:h-56 object-cover rounded-2xl"
//           />
//         </div>
        

//         {/* Doctor Detail Card */}
//         <div className="border border-gray-300 rounded-2xl p-5 sm:p-6 w-full shadow-sm bg-white">
//           {/* Name + Verified */}
//           <div className="flex items-center gap-2 mb-2">
//             <h1 className="text-xl sm:text-2xl font-semibold">{docInfo.name}</h1>
//             <img src={assets.verified_icon} className="w-5 h-5" alt="verified" />
//           </div>

//           {/* Degree & Speciality */}
//           <p className="text-gray-700 font-medium text-sm sm:text-base">
//             {docInfo.degree} - {docInfo.speciality}
//             <span className="ml-2 py-1 px-2 border text-[11px] sm:text-xs rounded-full border-gray-200 shadow-sm">
//               {docInfo.experience} yrs
//             </span>
//           </p>

//           {/* About */}
//           <div className="mt-6">
//             <div className="flex items-center gap-2 mb-2">
//               <p className="font-medium text-sm sm:text-base">About</p>
//               <img src={assets.info_icon} className="w-4 h-4" alt="info" />
//             </div>

//             <p
//               className="text-xs sm:text-sm text-gray-600 leading-relaxed"
//               style={{ textAlign: 'justify' }}
//             >
//               {docInfo.about}
//             </p>
//           </div>

//           {/* Fees */}
//           <div className="mt-6">
//             <p className="text-sm sm:text-base font-semibold">
//               Appointment fee:{' '}
//               <span className="font-bold">
//                 {currencysymbol}
//                 {docInfo.fees}
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Booking Slots Section */}
//       <div className="mt-10">
//         <p className="font-semibold text-gray-800 text-base sm:text-lg">
//           Booking slots
//         </p>
//         <p className="text-xs text-gray-500 mt-1">
//           Select a day and time slot to book your appointment
//         </p>

//         {/* Days Row */}
//         <div className="flex gap-3 items-center w-full mt-4 overflow-x-auto pb-2">
//           {docslots.length > 0 &&
//             docslots.map((daySlots, index) => {
//               const first = daySlots[0]
//               if (!first) return null

//               const dateObj = first.datetime

//               return (
//                 <button
//                   type="button"
//                   key={index}
//                   onClick={() => {
//                     setSlotIndex(index)
//                     setSlotTime(daySlots[0]?.time || '')
//                   }}
//                   className={`flex flex-col items-center justify-center px-3 py-2 rounded-full text-xs sm:text-sm min-w-[3.5rem] border transition-all
//                     ${
//                       slotIndex === index
//                         ? 'bg-blue-500 text-white border-blue-500'
//                         : 'border-gray-200 text-gray-700 bg-white'
//                     }`}
//                 >
//                   <span>{daysofWeek[dateObj.getDay()]}</span>
//                   <span className="text-[11px] mt-1">
//                     {dateObj.getDate()}
//                   </span>
//                 </button>
//               )
//             })}
//         </div>

//         {/* Time Slots Row */}
//         <div className="flex items-center gap-2 w-full overflow-x-auto mt-4 pb-2">
//           {docslots.length > 0 &&
//             docslots[slotIndex]?.map((slot, index) => (
//               <button
//                 type="button"
//                 key={index}
//                 onClick={() => setSlotTime(slot.time)}
//                 className={`text-xs sm:text-sm px-4 py-2 rounded-full whitespace-nowrap border transition-all
//                   ${
//                     slot.time === slotTime
//                       ? 'bg-blue-500 text-white border-blue-500'
//                       : 'text-gray-600 border-gray-300 bg-white'
//                   }`}
//               >
//                 {slot.time.toLowerCase()}
//               </button>
//             ))}

//           {docslots.length > 0 &&
//             docslots[slotIndex]?.length === 0 && (
//               <p className="text-xs text-gray-500">
//                 No slots available for this day.
//               </p>
//             )}
//         </div>

//         {/* Book Button */}
//         <  button  onClick={bookingAppointment}
//           type="button"
//           className="mt-6 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm sm:text-base font-medium px-6 py-2 rounded-full shadow-sm transition-all"
//           disabled={!slotTime}
//         >
//           {slotTime
//             ? `Book appointment at ${slotTime.toLowerCase()}`
//             : 'Select a time to book'}
//         </button>
//       </div>

//       {/* Listing related doctors */}
//       <RelatedDoctors  docId={docId}  speciality={docInfo.speciality}/>
//     </div>
//   )
// }

// export default Appointment












import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Appcontext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'

function Appointment() {
  const nav = useNavigate()
  const { docId } = useParams()

  const {
    docData,
    currencysymbol,
    fetchAllDoctorsData,
    token,
    backend_URL
  } = useContext(Appcontext)

  const daysofWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null)
  const [docslots, setDocslots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  /* ---------------- BOOK APPOINTMENT ---------------- */
  const bookingAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment')
      return nav('/login')
    }

    try {
      const date = docslots?.[slotIndex]?.[0]?.datetime
      if (!date || !slotTime) return

      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      const slotDate = `${day}_${month}_${year}`

      const response = await axios.post(
        `${backend_URL}/bookappointment`,
        { docId, slotDate, slotTime },
        { headers: { token } }
      )

      if (response.status === 201) {
        toast.success('Doctor booked successfully')
        await fetchAllDoctorsData()
        nav('/my-appointment')
      }
    } catch (err) {
      toast.error(err?.response?.data || 'Booking failed')
    }
  }

  /* ---------------- FETCH DOCTORS ---------------- */
  useEffect(() => {
    fetchAllDoctorsData()
  }, [])

  /* ---------------- FIND SELECTED DOCTOR ---------------- */
  useEffect(() => {
    if (!Array.isArray(docData)) {
      setDocInfo(null)
      return
    }

    const found = docData.find(doc => doc._id === docId)
    setDocInfo(found || null)
  }, [docData, docId])

  /* ---------------- GENERATE SLOTS (FILTER slots_booked) ---------------- */
  useEffect(() => {
    if (!docInfo) return

    const generateSlots = () => {
      const today = new Date()
      const allSlots = []

      for (let i = 0; i < 7; i++) {
        let currentDate = new Date(today)
        currentDate.setDate(today.getDate() + i)

        const day = currentDate.getDate()
        const month = currentDate.getMonth() + 1
        const year = currentDate.getFullYear()
        const slotDate = `${day}_${month}_${year}`

        let endTime = new Date(currentDate)
        endTime.setHours(21, 0, 0, 0)

        if (i === 0) {
          const now = new Date()
          currentDate.setHours(Math.max(10, now.getHours() + 1))
          currentDate.setMinutes(now.getMinutes() > 30 ? 30 : 0)
        } else {
          currentDate.setHours(10, 0, 0, 0)
        }

        // 🔑 BACKEND FIELD (UNCHANGED)
        const bookedTimes = docInfo.slots_booked?.[slotDate] || []
        const daySlots = []

        while (currentDate < endTime) {
          const time = currentDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          })

          // ✅ FILTER BOOKED SLOTS
          if (!bookedTimes.includes(time)) {
            daySlots.push({
              datetime: new Date(currentDate),
              time
            })
          }

          currentDate.setMinutes(currentDate.getMinutes() + 30)
        }

        allSlots.push(daySlots)
      }

      setDocslots(allSlots)
      setSlotIndex(0)
      setSlotTime(allSlots?.[0]?.[0]?.time || '')
    }

    generateSlots()
  }, [docInfo,docData])

  /* ---------------- LOADING GUARD ---------------- */
  if (!docInfo) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500">
        Loading doctor details...
      </div>
    )
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* Doctor Info */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="bg-blue-500 p-3 rounded-2xl">
          <img
            src={docInfo?.image || assets.profile_pic}
            alt={docInfo?.name || 'doctor'}
            className="w-52 h-52 object-cover rounded-2xl"
          />
        </div>

        <div className="border rounded-2xl p-6 w-full bg-white">
          <h1 className="text-2xl font-semibold">{docInfo?.name}</h1>

          <p className="text-gray-700 mt-1">
            {docInfo?.degree} - {docInfo?.speciality}
            <span className="ml-2 text-xs border px-2 py-1 rounded-full">
              {docInfo?.experience} 
            </span>
          </p>

          <p className="mt-4 text-sm text-gray-600">
            {docInfo?.about}
          </p>

          <p className="mt-4 font-semibold">
            Fee: {currencysymbol}{docInfo?.fees}
          </p>
        </div>
      </div>

      {/* Slots */}
      <div className="mt-10">
        <p className="font-semibold">Booking slots</p>

        {/* Days */}
        <div className="flex gap-3 mt-4 overflow-x-auto">
          {docslots.map((daySlots, index) => {
            const first = daySlots[0]
            if (!first) return null

            const d = first.datetime
            return (
              <button
                key={index}
                onClick={() => {
                  setSlotIndex(index)
                  setSlotTime(daySlots?.[0]?.time || '')
                }}
                className={`px-4 py-2 rounded-full border
                  ${slotIndex === index
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700'
                  }`}
              >
                {daysofWeek[d.getDay()]} {d.getDate()}
              </button>
            )
          })}
        </div>

        {/* Times */}
        <div className="flex gap-2 mt-4 overflow-x-auto">
          {docslots?.[slotIndex]?.map((slot, idx) => (
            <button
              key={idx}
              onClick={() => setSlotTime(slot.time)}
              className={`px-4 py-2 rounded-full border
                ${slot.time === slotTime
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600'
                }`}
            >
              {slot.time.toLowerCase()}
            </button>
          ))}

          {docslots?.[slotIndex]?.length === 0 && (
            <p className="text-gray-500 text-sm">
              No slots available
            </p>
          )}
        </div>

        {/* Book Button */}
        <button
          onClick={bookingAppointment}
          disabled={!slotTime}
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-full disabled:bg-gray-300"
        >
          {slotTime
            ? `Book at ${slotTime.toLowerCase()}`
            : 'Select a time'}
        </button>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors
        docId={docId}
        speciality={docInfo?.speciality}
      />
    </div>
  )
}

export default Appointment

















