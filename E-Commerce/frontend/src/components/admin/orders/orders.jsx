import React from 'react'
import AboutPage from '../aboutPage/aboutPage';
import NavBar from '../../navbar/navbar'
import { useState,useEffect } from 'react';
import '../../style.css'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const Orders = () => {
    const sessionToken=localStorage.getItem('token')
    const [data,setData]=useState([])
    const getData=async ()=>{
        const user=JSON.parse(localStorage.getItem('data'))
        await fetch('http://localhost:8020/appData/api/admin/order/getOrders',{
          headers:{
            'Content-Type':'application/json'
            ,'Authorization':localStorage.getItem('token')
          }
        })
        .then(res=>res.json()).then(data=>setData(data))
        return (data) 
      } 
      useEffect(()=>{
        (
          async ()=>{
            await getData()  
          } 
        )()
      },[])
  return (
    <>
    <NavBar loginStatus={sessionToken.length>1}></NavBar>
    <AboutPage title="orders"></AboutPage>
    
    {data.map((row,idx) => (
    
      (row.quantity>0) && (
        <center key={idx}>
          <Table 
        style={{border:'1px solid black',width:'60%'}}
        aria-label="a dense table"  className='mt-5 ok justify-content-center'>
        <TableHead>
          <TableRow style={{backgroundColor:'#FFD662FF'}}>
            <TableCell style={{fontWeight:'bolder',color:'#00539CFF'}}>Details</TableCell>
            <TableCell style={{fontWeight:'bolder',color:'#00539CFF'}} align="right">Values</TableCell>           
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">Product ID</TableCell>
              <TableCell align="right">{row.productId}</TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">Product Name</TableCell>
              <TableCell align="right">{row.productName}</TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">Cost</TableCell>
              <TableCell align="right">{row.cost}</TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">User Name</TableCell>
              <TableCell align="right">{row.userName}</TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">Quantity</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
        </center>
      )
    
       ))}
    
    
    </>
);
}


export default Orders;