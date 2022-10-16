import React,{useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import NavBar from "../navbar/navbar";
import CardBody from "../cards/card";
import Filter from "../filter/filter";
import { useState } from "react";
import {BsSearch} from "react-icons/bs"
import Form from 'react-bootstrap/Form';
import Footer from '../footer/footer'

function Home(props) {
  const sessionToken=localStorage.getItem('token') ? localStorage.getItem('token') : ''
  const [data,setData]=useState([])
  const [baseData,setBaseData]=useState([])
  const [search,setSearch]=useState('')
  const [category,setCategory]=useState([])
  const getData=async ()=>{
    await fetch('http://localhost:8020/appData/api/user/product/getItems').then(res=>res.json())
    .then(data=>{
      setData(data)
      setBaseData(data)
      var names=[]
      for(let i=0;i<data.length;i++){
        if(names.indexOf(data[i].category)==-1){
          names=[...names,data[i].category]
          }
        }
        setCategory(names)
      
    })
  }
  useEffect(()=>{
    (
      async ()=>{
        await getData()
        console.log("here") 
      } 
    )()
  },[])
  const sortType=(type)=>{
    console.log(type)
    if(type){
      data.sort((a,b) => a.cost - b.cost);
    }
    else{
      data.sort((a,b) => b.cost - a.cost);
    }
    setData([...data])
  }
  const handleSearch=async ()=>{
    var newData=baseData
    if(search===''){
      getData()
    }
    else{

      const searched = newData.filter(item => item.category === search);
      console.log(searched)
      setData(searched)
    }
  }
  const handleSelect=async (e)=>{
    var newData=baseData
    if(e.target.value==='Select'){
      setData(newData)
    }
    else{

      const searched = newData.filter(item => item.category === e.target.value);
      console.log(searched)
      setData(searched)
    }
  }

  return (
      <>
      <NavBar loginStatus={sessionToken.length>1}></NavBar>
        {/* search bar */}
        < div style={{width:'50vw',marginLeft:'25vw',border:'1px solid black',display:'flex'}} className="mt-5"  >
        <Form.Select aria-label="Default select example" style={{width:'10vw'}} 
        onChange={(e)=>{handleSelect(e)}}>
                    <option value={'Select'}>Select</option>
                    {
                      category.map((ele,idx)=>(
                        <option key={idx} value={ele}>{ele}</option>
                      ))
                    }
                    
        </Form.Select>
        <InputGroup >
                    <FormControl
                    
                        placeholder="Search Category"
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                        onChange={(e)=>{setSearch(e.target.value)}}
                    />
                    <Button variant="warning" id="button-addon2" style={{borderLeft:'1px solid black'}}
                    onClick={()=>{
                      handleSearch()
                    }}>
                        <BsSearch/>
                    </Button>
        </InputGroup></div>
        <Filter className='mt-5' typeOfSort={(val)=>{
          sortType(val)
        }}></Filter>
      <CardBody data={data} ></CardBody>
      <Footer></Footer>
      </>
    
  );
}

export default Home;