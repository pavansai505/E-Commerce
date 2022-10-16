import React, { useEffect } from 'react'
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { AiOutlineHeart } from 'react-icons/ai';
import {BsFillCartPlusFill} from 'react-icons/bs'
import Button from 'react-bootstrap/Button';
// import './card.css'
import { useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { memo } from 'react';
import { Container } from 'react-bootstrap';
import '../style.css'
function CardBody({data}) {
  const [infoData,setInfo]=useState({})
  const notify = () => toast.success('Item added to WishList!', {
                                      position: "top-center",
                                      autoClose: 3000,
                                      hideProgressBar: false,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                      });
  const notify2 = () => toast.success('Item added to Cart!', {
                                      position: "top-center",
                                      autoClose: 3000,
                                      hideProgressBar: false,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                      });
  const infoAdjust=()=>{ 
    var names=[]
    var sales={}
    for(let i=0;i<data.length;i++){
        if(names.indexOf(data[i].category)==-1){
          names=[...names,data[i].category]
          sales[data[i].category]=[]
          }
    }
    names.forEach((value)=>{
      for(let i=0;i<data.length;i++){
          if(data[i].category==value){
            sales[value]=[...sales[value],data[i]]
          }
        }})
      console.log("sales=",sales)
      setInfo(sales)
      return sales
  }
  useEffect(()=>{
    (
      async ()=>{ 
      setInfo(infoAdjust())
        
      } 
    )()
  },[])
  const addToWishList=(val)=>{
    const user=JSON.parse(localStorage.getItem('data'))
    fetch('http://localhost:8020/appData/api/user/product/addToWishList/'+user._id,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
        ,'Authorization':localStorage.getItem('token')
      },
      body:JSON.stringify(val)
    }).then(res=>res.json()).then(data=>notify()).catch(err=>console.log(err))
    
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
  
  
    
  return (
    <>
    <div>
      <center>
      <Container>
      <Row xs={1} md={2} sm={1} lg={3}>
      {data.map((element, index) => (
        <Col key={index} className='mt-5 mb-5'> 
          <Card style={{ width: '18rem',border:'1px solid black'}} className="h-100 inp ok" >
            <Card.Img variant="top" src={element.image} style={{width:"100%",  height:"100%" , objectFit: "cover" ,padding:'2vh' }} />
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
              {
                ((localStorage.getItem('type'))==='user') && (
                  <Stack direction="horizontal" gap={3}>
              <Button variant="light" onClick={()=>{
                addToWishList(element);
                
              }}><AiOutlineHeart style={{fontSize:'4vh',color:'red'}}></AiOutlineHeart></Button>
              
              <div className="vr" />
              <Button variant="light" onClick={()=>{
                addToCart(element);

              }}>
              <BsFillCartPlusFill style={{fontSize:'4vh',color:'gold'}}></BsFillCartPlusFill>
              </Button>
              
              </Stack>
                )
              }
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
      </Container>
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
    </>
  )
}

export default memo(CardBody);