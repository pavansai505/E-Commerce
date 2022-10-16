import React from 'react'
import{FaInstagramSquare } from "react-icons/fa"
import{AiFillTwitterSquare} from "react-icons/ai"
import{FaFacebookSquare} from "react-icons/fa"
import{AiFillGoogleSquare} from "react-icons/ai"



const Footer = () => {
  return (
    <div style={{width: '100%',marginTop:'40vh',bottom: 0}}>
      <footer style={{ textAlign: 'center' ,
  padding: '3vh', minWidth:'400px',
  
  backgroundColor:'	#d9d9d9',

  color: 'black'}}>
    <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5">
                <ul >
    <FaInstagramSquare style={{width:'4vw',color:'#cd486b', fontSize:'5vh'}}></FaInstagramSquare>
    <AiFillTwitterSquare style={{width:'4vw',color:'#55ACEE',fontSize:'6vh'}}></AiFillTwitterSquare>
    <FaFacebookSquare style={{width:'4vw',color:'#3B5998',fontSize:'5vh'}}></FaFacebookSquare>
    <AiFillGoogleSquare style={{width:'4vw',color:'#dd4b39',fontSize:'6vh'}}></AiFillGoogleSquare>
    </ul>
    </div>
    <hr/>
    </div>
     
  <p>Author: Pavan <br/>
  <a href="mailto:vexatious7924@gmail.com">vexatious7924@gmail.com</a></p>
   </footer>
    </div>
  )
}

export default Footer