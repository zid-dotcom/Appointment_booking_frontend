import { createContext, useState } from "react";
import { doctors } from "../assets/assets";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

 
 

export const Appcontext=createContext()  /* first we need to create a context  */



const Appcontextprovider=({children})=>{  

    // storing user login token
    
    const [token,settoken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):'')

    const [docData,setDocData]=useState([]) /* here we storing all doctors data */

    const [userData,setUserData]=useState([])  /* here we storing userprofile data */



    const backend_URL=import.meta.env.VITE_BACKEND_URL
    

    // fetching all doctors data

    const fetchAllDoctorsData=async()=>{
        try{
             const response=await axios.get(`${backend_URL}/listAlldoctors`)
        console.log(response);
        setDocData(response.data)

        }
        catch(err){
            console.log(err);
            toast.error("something went wrong")
            
        }
       
        
    }





// get user profile data

const loadUserProfileData=async()=>{
    try{
        const response=await axios.get(`${backend_URL}/getprofile`,{headers:{token}})
        console.log(response);
        if(response.status==200){
            setUserData(response.data)
        }
        else{
            toast.error('something went wrong')
        }
        

    }
    catch(err){
        console.log(err);
        toast.error(err.response.data)
        
    }
}






  useEffect(() => {
    if (token) {
      loadUserProfileData()

    }


  }, [token])







   
  

    const currencysymbol='$'    
    const value={
        doctors,
        assets,
        currencysymbol,
        backend_URL,
        fetchAllDoctorsData,
        docData,
        token,
        settoken,
        loadUserProfileData,
        userData,
        setUserData

    }

    return (
        <Appcontext.Provider  value={value}>
            {children}

        </Appcontext.Provider>
    )



}
export default Appcontextprovider











 





