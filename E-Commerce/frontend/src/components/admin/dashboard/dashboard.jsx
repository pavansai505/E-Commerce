import { Link } from 'react-router-dom';
import AboutPage from '../aboutPage/aboutPage';
import { Row,Col,Button, Container } from 'react-bootstrap';
import './style.css'
//import './style.css'
const Dashboard = () => {
    
  return (
    <>
    
    <AboutPage title="Admin Dashboard"></AboutPage>
    <center>
    <Container>
    <Row xs={1} sm={1} md={2} lg={3} gap={3} className='mt-5'>
    <Col><Link to='/bulkupload' className='l1'><Button className='bt1'>Bulk Upload</Button></Link></Col>
    <Col><Link to='/createproduct' className='l1'><Button className='bt1'>Create Product</Button></Link></Col>
    <Col><Link to='/orders' className='l1'><Button className='bt1'>View Orders</Button></Link></Col>
    <Col><Link to='/manageproducts' className='l1'><Button className='bt1'>Manage Products</Button></Link></Col>
    <Col><Link to='/manageusers' className='l1'><Button className='bt1'>Manage Users</Button></Link></Col>
    <Col><Link to='/productstatus' className='l1'><Button className='bt1'>Product Stock</Button></Link></Col>
    <Col><Link to='/salereport' className='l1'><Button className='bt1'>Sale Report</Button></Link></Col>
    
    <Col><Link to='/discount' className='l1'><Button className='bt1'>Discount Coupons</Button></Link></Col>
    <Col><Link to='/' className='l1'><Button variant="warning" className='bt1'>Go To Shop</Button></Link></Col>
    </Row>
    </Container>
    </center>
    
    </>

  );
}

export default Dashboard;