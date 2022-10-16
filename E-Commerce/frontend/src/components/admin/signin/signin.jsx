import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from 'react'
import './signin.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { validate } from 'email-validator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminSignin = (props) => {
  const notify=()=>toast.error('Wrong Credentials', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
  const [mail,setMail]=useState('')
  const [password,setPassword]=useState('')
  const [mailHelper,setMailHelper]=useState('')
  const [passwordHelper,setPasswordHelper]=useState('')
  const navigate=useNavigate()
  const handleChange=(e)=>{
    if(e.target.name=='mail'){
      if(validate(e.target.value)){
        setMail(e.target.value)
        setMailHelper('')
      }
      else{
        setMail('')
        setMailHelper('Invalid Email')
      }
    }
    if(e.target.name=='password'){
      const value=e.target.value
      if(value!==''){
        
        if(value.length>=7){
          setPassword(value)
          setPasswordHelper('')
          
        }
        else{
          setPasswordHelper(' Shouldn\'t be less than 8 characters' )
        }
      }
      else{
        setPasswordHelper('Please Provide Password' )
      }
    }
    
    
  }
  const handleOnSubmit=(e)=>{
    e.preventDefault()
    const data={
      adminMail:mail,
      password:password
    }
    fetch('http://localhost:8020/appData/api/admin/signin',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    }).then(res=>res.json())
    .then(data=>{
      if(data.message){
        localStorage.setItem('token','Bearer '+data.token)
        localStorage.setItem('data',JSON.stringify(data.admin))
        localStorage.setItem('type','admin')
        navigate('/')
      }
      else{
        notify()
      }
    })
    
  }



  return (
   <center>
    <div style={{marginTop:'10vh',paddingTop:'10vh',width:'30vw',height:'70vh',minWidth:'350px'}}>
    <center className='inp pt-5' style={{border:'1px solid black'}}>
    <h1>Signin</h1>
    <Form className='form1' style={{width:'70%'}}>
      <Form.Group className="mb-3" controlId="Email">
        <Form.Label >Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" autoComplete='off'name="mail"
        onChange={(e)=>{handleChange(e)}}
        />
        <Form.Text>{mailHelper}</Form.Text>
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="Password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" autoComplete='off' name="password"
        onChange= {(e)=>{handleChange(e)}} />
        <Form.Text>{passwordHelper}</Form.Text>
      </Form.Group>
      <div>
      <Button variant="primary" type="submit" onClick={handleOnSubmit}
      disabled={!(mail && password )}>
        Submit
      </Button>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        
        />
      </div>
      <br/>
      <div className="mb-3">
          New Admin?{' '}
          <Link to={`/admin/signup`}>Create your account</Link>
      </div>
      <div className="mb-3">
          User?{' '}
          <Link to={`/signin`}>SIgnin</Link>
      </div>
    </Form>
    </center>
   </div>
   </center>
  

  );
}

export default AdminSignin