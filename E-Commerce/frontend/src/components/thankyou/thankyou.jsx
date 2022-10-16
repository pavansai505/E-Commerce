import React from 'react'
import NavBar from '../navbar/navbar'
import {MdCheckCircle} from "react-icons/md"

const Thankyou = () => {
    
  const sessionToken=localStorage.getItem('token')
  return (
    <>
        <NavBar loginStatus={sessionToken.length>1}></NavBar>
        <center>
        <div style={{marginTop:'25vh' , minWidth:400}}>
            <center>
            <MdCheckCircle style={{color:'green' , fontSize:'15vh' }}></MdCheckCircle>
        <br/>
         <br/>
        <span style={{fontSize:'5vh'}}>order placed successfully</span>
        </center>
       </div> 
        </center>

    </>
  )
}

export default Thankyou