import AboutPage from '../aboutPage/aboutPage';
import NavBar from '../../navbar/navbar'
import { useState,useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function ProductStatus() {
    const sessionToken=localStorage.getItem('token')
    const [data, setData] = useState([])
  const getData=async ()=>{
    const user=JSON.parse(localStorage.getItem('data'))
    await fetch('http://localhost:8020/appData/api/admin/product/getItems',{
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
    <AboutPage title='Stock Status'></AboutPage>
      <center className='mt-5'>
      <Table style={{width:'60%',border:'1px solid black'}} aria-label="a dense table">
        <TableHead>
          <TableRow style={{backgroundColor:'#FFD662FF'}}>
            <TableCell style={{fontWeight:'bolder',color:'#00539CFF'}}>Product Name</TableCell>
            <TableCell style={{fontWeight:'bolder',color:'#00539CFF'}} align="right">Product Category</TableCell>           
            <TableCell style={{fontWeight:'bolder',color:'#00539CFF'}} align="right">In Stock</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,idx) => (
            <TableRow
              key={idx}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.productName}
              </TableCell>
              <TableCell align="right">{row.category}</TableCell>
              
              <TableCell align="right">
                {row.stock}
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </center>
    
    </>
  );
}

export default ProductStatus;