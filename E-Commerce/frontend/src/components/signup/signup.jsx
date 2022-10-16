import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { validate } from 'email-validator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Signup = () => {
  const notify=()=>toast.error('User already exists!', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
    const notify2=()=>toast.error('Confirm Password should be same Password!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  const [name,setName]=useState('')
  const [mail,setMail]=useState('')
  const [password,setPassword]=useState('')
  const [cpassword,setCPassword]=useState('')
  const [mailHelper,setMailHelper]=useState('')
  const [passwordHelper,setPasswordHelper]=useState('')
  const [nameHelper,setNameHelper]=useState('')
  const [cpasswordHelper,setCPasswordHelper]=useState('')
  const navigate=useNavigate('/')
  const handleChange=(e)=>{
    if(e.target.name=='name'){
      if(e.target.value.length>2){
        setName(e.target.value)
        setNameHelper('')
      }
      else{
        setName('')
        setNameHelper('Should be more than 2 characters')
      }
    }
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
        if(value.length>=8){
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
    if(e.target.name=='cpassword'){
      const value=e.target.value
      if(value!==''){
        if(value.length>=8){
          if(value==password){
            console.log(value)
            setCPassword(value)
            setCPasswordHelper('')
          }
          else{
            setCPassword(value)
            setCPasswordHelper('Should be same as password')
          }
          
        }
        else{
          setCPasswordHelper(' Shouldn\'t be less than 8 characters' )
          setCPassword('')
        }
      }
      else{
        setCPasswordHelper('Please Provide Password' )
        setCPassword('')
      }
    }}
  const handleOnSubmit=(e)=>{
    e.preventDefault()
    
    
      
   if(password==cpassword){
    const data={
      userName:name,
      userMail:mail,
      password:password,
    }
    fetch('http://localhost:8020/appData/api/user/signup',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    }).then(res=>res.json())
    .then(data=>navigate('/signin')).catch(err=>notify())
   }
   else{
    notify2()
   }
    
  }

  return (
   <center>
     <div style={{paddingTop:'5vh',width:'30vw',minWidth:'350px',height:'80vh'}}>
   <center className='inp pt-5' style={{border:'1px solid black'}}>
    <h1>User Register</h1>
    <Form className='form1' style={{width:'70%'}}>
    <Form.Group className="mb-3" controlId="username">
        <Form.Label >User Name</Form.Label>
        <Form.Control type="text"  placeholder="Enter username" name="name" autoComplete='off'
        onChange={(e)=>{handleChange(e)}}/>
        <Form.Text>{nameHelper}</Form.Text>
        
      </Form.Group>
      <Form.Group className="mb-3" controlId="Email">
        <Form.Label >Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="mail" autoComplete='off'
        onChange={(e)=>{handleChange(e)}}/>
        <Form.Text>{mailHelper}</Form.Text>
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="Password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" autoComplete='off'
        onChange={(e)=>{handleChange(e)}}/>
        <Form.Text>{passwordHelper}</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="Confirm Password">
        <Form.Label> Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" name="cpassword" autoComplete='off'
        onChange={(e)=>{handleChange(e)}}
        />
        <Form.Text>{cpasswordHelper}</Form.Text>
      </Form.Group>
      <div>
      <Button variant="primary" type="submit" 
      disabled={!(mail && password && name && cpassword)}
      onClick={handleOnSubmit}>

        Register
      </Button >

      </div>
      <br/>
      <div className="mb-3">
          Already have an account?{' '}
          <Link to={`/signin?`}>Signin</Link>
      </div>
      <div className="mb-3">
          Admin?{' '}
          <Link to={`/admin/signup`}>SignUp</Link>
      </div>
      <br/>
      
    </Form>
    </center>
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
   </center>

  );
}

export default Signup