import React, { useEffect } from 'react'
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {BsFillCartPlusFill} from 'react-icons/bs';
import {IoIosHeartDislike} from 'react-icons/io'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './card.css'
import { useState} from "react";
import NavBar from '../navbar/navbar'
import AboutPage from '../admin/aboutPage/aboutPage';
import { Button, Container } from 'react-bootstrap';
function WishList() {
  const notify2 = () => toast.success('Item added to Cart!', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
  const sessionToken=localStorage.getItem('token')
  const [data, setData] = useState([])
  const getData=async ()=>{
    const user=JSON.parse(localStorage.getItem('data'))
    await fetch('http://localhost:8020/appData/api/user/getUser/'+user._id,{
      headers:{
        'Content-Type':'application/json'
        ,'Authorization':localStorage.getItem('token')
      }
    })
    .then(res=>res.json()).then(data=>setData(data.userData.wishList))
    return (data) 
  } 
  useEffect(()=>{
    (
      async ()=>{
        await getData()  
      } 
    )()
  },[])
  const removeFromWishList=async (val)=>{
    const user=JSON.parse(localStorage.getItem('data'))
    await fetch('http://localhost:8020/appData/api/user/product/removeFromWishList/'+val._id+'/'+user._id,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json'
        ,'Authorization':localStorage.getItem('token')
      }
    }).then(res=>res.json()).then(data=>console.log(data))
    await getData()
  }
  const addToCart=(val)=>{
    const user=JSON.parse(localStorage.getItem('data'))
    fetch('http://localhost:8020/appData/api/user/product/addToCart/'+user._id,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
        ,'Authorization':localStorage.getItem('token')
      },
      body:JSON.stringify(val)
    }).then(res=>res.json()).then(data=>notify2())
    
  }

  if(data.length<1){
    return(
      <>
      <NavBar loginStatus={sessionToken.length>1}></NavBar>
      <AboutPage title="Cart"></AboutPage>
      <center className='mt-5'>
        <h1>Your wishlist seems to be empty</h1>
      </center>
      </>
      
    )
  }
    
  return (
    <>
    
    <NavBar loginStatus={sessionToken.length>1}></NavBar>
    <AboutPage title="Wish List"></AboutPage>
    <center>
    <Container className='mt-5' style={{minWidth:'400px'}}>
      <Row xs={1} md={2} sm={1} lg={3} className="g-3 ">
      {data.map((element, index) => (
        <Col key={index} className='mb-5'>
          <Card style={{ width: '18rem'}} className="h-100 inp">
            <Card.Img variant="top" src={element.image} style={{width:"100%",  height:"100%" , objectFit: "cover",padding:'2vh' }} />
            <Card.Body style={{textAlign:'left'}}>
              <Card.Title>{element.productName}</Card.Title>
              <Card.Text>
                <strong>Price :{element.cost}</strong>
              </Card.Text>
              <Card.Text>
                <strong>Availability :{
                  (element.stock>0)? "Available":"Not Available"
                  }</strong>
              </Card.Text>
              <Stack direction="horizontal" gap={3}>
              <Button variant='light' onClick={()=>{removeFromWishList(element)}}>
              <IoIosHeartDislike style={{fontSize:'4vh',color:'black'}}></IoIosHeartDislike>
              </Button>
              <Button variant="light" onClick={()=>{
                addToCart(element)
              }}>
              <BsFillCartPlusFill style={{fontSize:'4vh',color:'gold'}}></BsFillCartPlusFill>
              </Button>
              </Stack>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
      </Container>
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
    </center>
    </>
  )
}

export default WishList