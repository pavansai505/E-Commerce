import { Button, Form, Stack } from 'react-bootstrap';
import AboutPage from '../aboutPage/aboutPage';
import NavBar from '../../navbar/navbar'
import { useState,useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


function SaleReport() {
    const sessionToken=localStorage.getItem('token')
    const [data,setData]=useState([])
    const [baseData,setBaseData]=useState([])
    const [sales,setSales]=useState({})
    const [fromDate,setFromDate]=useState(null)
    const [toDate,setToDate]=useState(null)
    const getData=async ()=>{
        const user=JSON.parse(localStorage.getItem('data'))
        await fetch('http://localhost:8020/appData/api/admin/order/getOrders',{
            headers:{
                'Content-Type':'application/json'
                ,'Authorization':localStorage.getItem('token')
              }
        })
        .then(res=>res.json()).then(data=>{
            console.log(data)
            setData(data)
            setBaseData(data)
            var names=[]
            var sales={}
            for(let i=0;i<data.length;i++){
                if(names.indexOf(data[i].productName)==-1){
                    names=[...names,data[i].productName]
                }
            }
            names.forEach((value)=>{
                var arr={}
                for(let i=0;i<data.length;i++){
                    if(data[i].productName==value){
                        
                        if('quantity' in arr){
                            console.log(data[i].quantity)
                            arr['quantity']+=data[i].quantity
                        }
                        else{
                            arr['quantity']=data[i].quantity
                        }
                    }
                    arr['cost']=data[i].cost
                }
                sales[value]=arr
                
            })
            setSales(sales)
            
        })
        return (data) 
      } 
      useEffect(()=>{
        (
          async ()=>{
            await getData()  
          } 
        )()
      },[])
      const handleChange=async (e)=>{
        var newData=baseData
        console.log(newData)
        const filtered=newData.filter((ele)=>(new Date(ele.date)>new Date(fromDate) && new Date(ele.date)<new Date(toDate)))
        console.log(filtered)
        setData(filtered) 
       
        

      }
  return (
    <>
    <NavBar loginStatus={sessionToken.length>1}></NavBar>
    <AboutPage title='Sales Report'></AboutPage>
    <center>
    <>
    <center>
    <Stack  className='mt-5' gap={3} >
    <Form.Label style={{fontWeight:'bolder'}}>From :
    <Form.Control type="date" 
    style={{width:'10vw',minWidth:'120px'}}
    name="from"
    onChange={(e)=>{setFromDate(e.target.value)}}></Form.Control></Form.Label>
    <div className='vr'/>
    <Form.Label style={{fontWeight:'bolder'}}>To :
    <Form.Control type="date" 
    style={{width:'10vw',minWidth:'120px'}}
    name="to"
    onChange={(e)=>{setToDate(e.target.value)}}></Form.Control></Form.Label>
    <div className='vr'/>
    <center>
    <Button style={{width:'7vw'}} onClick={()=>{handleChange()}}>Filter</Button>
    </center>
    </Stack>
    </center>

    </>
    <h3 className='mt-5'>Overall Sales</h3>
    <Table style={{width:'60%',mindWidth:'400px'}} aria-label="a dense table" className='mt-5'>
        <TableHead>
          <TableRow style={{backgroundColor:'#FFD662FF'}}>
            <TableCell style={{fontWeight:'bolder',color:'#00539CFF'}}>Product Name</TableCell>
            <TableCell style={{fontWeight:'bolder',color:'#00539CFF'}} align="right">Price</TableCell>           
            
            <TableCell style={{fontWeight:'bolder',color:'#00539CFF'}} align="right">Quantity</TableCell>
            <TableCell style={{fontWeight:'bolder',color:'#00539CFF'}} align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(sales).map((row,idx) => (
            (sales[row].quantity>0) && (
                <TableRow
              key={idx}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row}
              </TableCell>
              <TableCell align="right">{sales[row].cost}</TableCell>
              
              <TableCell align="right">
                {sales[row].quantity}
              </TableCell>
              <TableCell align="right">
                {sales[row].cost*sales[row].quantity}
              </TableCell>
            </TableRow>
            )
          ))}
        </TableBody>
      </Table>
      <h3 className='mt-5'>Individual Sales</h3>
      <Table style={{width:'60%',mindWidth:'400px',marginBottom:'10vh'}} aria-label="a dense table" className='mt-5'>
        <TableHead>
          <TableRow style={{backgroundColor:'#FFD662FF'}}>
            <TableCell style={{fontWeight:'bolder',color:'#00539CFF'}}>Product Name</TableCell>
            <TableCell style={{fontWeight:'bolder',color:'#00539CFF'}} align="right">Price</TableCell>           
            
            <TableCell style={{fontWeight:'bolder',color:'#00539CFF'}} align="right">Quantity</TableCell>
            <TableCell style={{fontWeight:'bolder',color:'#00539CFF'}} align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,idx) => (
            (row.quantity>0) && (
                <TableRow
              key={idx}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.productName}
              </TableCell>
              <TableCell align="right">
                {row.cost}
              </TableCell>
              <TableCell align="right">
              {row.quantity}
              </TableCell>
              <TableCell align="right">
              {((new Date(row.date)).getDate())+'-'+((new Date(row.date)).getMonth()+1)+'-'+(new Date(row.date)).getFullYear()}
              </TableCell>
            </TableRow>
            )
          ))}
        </TableBody>
      </Table>
    </center>
    </>
  );
}

export default SaleReport;