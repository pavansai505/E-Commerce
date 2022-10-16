import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AboutPage from '../aboutPage/aboutPage'
import NavBar from '../../navbar/navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function BulkUpload() {
  const notify = () => toast.success('Upload Success!', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
  const sessionToken=localStorage.getItem('token')
  const [selectFile,setSelectFile]=useState(null)
  const submitFile=(e)=>{
    //console.log(selectFile)
    const formData = new FormData();
    formData.append(
      "file",
      selectFile,
      selectFile.name
    );
    fetch('http://localhost:8020/bulkUpload', {
      method: 'POST',
      headers:{
        'Authorization':localStorage.getItem('token')
      },
      body: formData,
    })
      .then((response) => {return response.json();})
      .then(data=>notify())
      .catch((err) => {console.log(err)});
  }
  return (
    <>
    <NavBar loginStatus={sessionToken.length>1}></NavBar>
    <AboutPage title="Bulk Upload"></AboutPage>
    <center>
    <div className='mt-5'>
    <Form.Group controlId="formFile" className="mb-3" style={{width:'50vw'}}>
        <Form.Label>Upload CSV file </Form.Label>
        <Form.Control type="file" size='lg'
        onChange={(e)=>{
          setSelectFile(e.target.files[0])
        }}
        
        />
    </Form.Group>
    <Button variant="primary" onClick={submitFile}>Submit</Button>
    </div>
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
    </>
  )
}

export default BulkUpload