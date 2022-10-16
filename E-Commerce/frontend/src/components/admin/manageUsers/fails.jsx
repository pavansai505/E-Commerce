
import React from 'react'
import {Container,FormControl,Navbar,Dropdown,Nav,Badge, Row} from "react-bootstrap";
import "./navbar.css"
import {AiFillShop} from 'react-icons/ai'
import { FaHeart,FaSignInAlt ,FaShoppingCart} from "react-icons/fa";
import { GoSignOut} from "react-icons/go";
import { BsPersonPlusFill } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import {GiHamburgerMenu } from "react-icons/gi";
import {BrowserRouter,Route, Link, useNavigate} from "react-router-dom"
import Stack from 'react-bootstrap/Stack'
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";    
import { useState,useEffect } from 'react';
import Media from 'react-media';
import DropdownButton from 'react-bootstrap/DropdownButton';

const SimpleAccordion = (props) => {
    
    const navigate=useNavigate()
    
    
  return (

    <Navbar  style={{borderBottom:'2px solid black',minWidth:'500px',backgroundColor:'aquawhite'}}>
        
            <Navbar.Brand style={{marginLeft:'0vw'}}>
                 <strong style={{fontFamily:' “Playfair Display”, “Didot”, "Times New Roman", Times, serif'}}>🏠 ShopForHome</strong>
            </Navbar.Brand>
            
            <Nav className={'ms-auto'} style={{marginRight:'5vw'}}>
            <Media query="(min-width: 500px)" render={() =>
          (
            <Stack  direction='horizontal' className="stack">
                <Link to='/' style={{ textDecoration: 'none',color:'green' }}>
                <div className='divs'>
                <AiFillShop  style={{fontSize:'4vh'}}>

                </AiFillShop><span style={{paddingLeft:'0.5vw' , fontSize:'60%'}}>Shop</span>
                </div>
                </Link>
                
            {
                (props.loginStatus && (localStorage.getItemText('type'))==='user') && (
                    <>
                    {/* <Link to='/cart' style={{ textDecoration: 'none',color:'orange' }}>
                    <div className='divs'>
                         <FaShoppingCart >
                         </FaShoppingCart> <span style={{paddingLeft:'0.5vw', fontSize:'60%'}}>cart</span>
                     </div>
                    </Link> */}
                     <Link to='/wishlist' style={{ textDecoration: 'none',color:'#FF1493' }}>
                     <div className='divs'>
                         <FaHeart style={{fontSize:'4vh'}}>
                         </FaHeart>
                         <span style={{paddingLeft:'0.5vw',fontSize:'60%'}}>Wishlist</span>
                     </div>
                     </Link>
                     <Link to='/cart' style={{ textDecoration: 'none',color:'	#FF8C00' }}>
                    <div className='divs'>
                         <FaShoppingCart style={{fontSize:'4vh'}}>
                         </FaShoppingCart> <span style={{paddingLeft:'0.5vw', fontSize:'60%'}}>cart</span>
                     </div>
                    </Link>
                    </>
                )
            }
            {
                (!props.loginStatus) && (
                    <>
                    <Link to='/signin' style={{ textDecoration: 'none',color:'royalblue' }}>
                    <div className='divs'>
                        <FaSignInAlt style={{fontSize:'4vh'}}>
                        </FaSignInAlt >
                        <span style={{paddingLeft:'0.5vw',fontSize:'60%'}}>Signin</span>
                    </div>
                    </Link>
                    <Link to='/signup' style={{ textDecoration: 'none',color:'royalblue' }}>
                    <div className='divs'>
                        <BsPersonPlusFill style={{fontSize:'4vh'}}>
                        </BsPersonPlusFill>
                        <span style={{paddingLeft:'0.5vw',fontSize:'60%'}}>Register</span>
                    </div>
                    </Link>
                    </>
                )
            }
           {
            (props.loginStatus && (localStorage.getItemText('type'))==='admin') && (
                <Link to='/dashboard'>
                <div className='divs'>
                <MdDashboard style={{fontSize:'4vh'}}></MdDashboard>
                <span style={{paddingLeft:'0.5vw',fontSize:'60%'}}>Dashboard</span>
            </div>
                </Link>
            )}
            {
            (props.loginStatus ) && (
                <Button variant='link'style={{color:'red' }}>
                <div className='divs'>
                <GoSignOut style={{color:'red',fontSize:'4vh'}}></GoSignOut>
                <span style={{paddingLeft:'0.5vw',fontSize:'70%'}}
                onClick={()=>{
                    localStorage.setItem('token','')
                    localStorage.setItem('data','')
                    localStorage.setItem('type','')
                    navigate('/signin')
                }}
                >Signout</span>
                </div>
                </Button>
            
            )
           }
           
            </Stack>
          )}/>
                
            <Media query="(max-width: 499px)" render={() =>
          (
            
            <DropdownButton variant='dark' style={{fontSize:'4vh',marginRight:'5vw'}} id="dropdown-basic-button" title="&#9776;" >
              <Dropdown.ItemText>
              <Link to='/' style={{ textDecoration: 'none',color:'green' }}>
                <div className='divs'>
                <AiFillShop  style={{fontSize:'4vh'}}>

                </AiFillShop><span style={{paddingLeft:'0.5vw' , fontSize:'60%'}}>Shop</span>
                </div>
                </Link>
              </Dropdown.ItemText>
              <Dropdown.ItemText>
              {
                (props.loginStatus && (localStorage.getItemText('type'))==='user') && (
                    
                     <Link to='/wishlist' style={{ textDecoration: 'none',color:'#FF1493' }}>
                     <div className='divs'>
                         <FaHeart style={{fontSize:'4vh'}}>
                         </FaHeart>
                         <span style={{paddingLeft:'0.5vw',fontSize:'60%'}}>Wishlist</span>
                     </div>
                     </Link>
                     
                  
                )
            }
              </Dropdown.ItemText>
              <Dropdown.ItemText>
              {
                (props.loginStatus && (localStorage.getItemText('type'))==='user') && (
                    
                     <Link to='/cart' style={{ textDecoration: 'none',color:'	#FF8C00' }}>
                    <div className='divs'>
                         <FaShoppingCart style={{fontSize:'4vh'}}>
                         </FaShoppingCart> <span style={{paddingLeft:'0.5vw', fontSize:'60%'}}>cart</span>
                     </div>
                    </Link>
                    
                )
            }
              </Dropdown.ItemText>
              <Dropdown.ItemText>
              {
                (!props.loginStatus) && (
                    
                    <Link to='/signin' style={{ textDecoration: 'none',color:'royalblue' }}>
                    <div className='divs'>
                        <FaSignInAlt style={{fontSize:'4vh'}}>
                        </FaSignInAlt >
                        <span style={{paddingLeft:'0.5vw',fontSize:'60%'}}>Signin</span>
                    </div>
                    </Link>
                    
                )
            }
              </Dropdown.ItemText>
              <Dropdown.ItemText>
              {
                (!props.loginStatus) && (
                    <Link to='/signup' style={{ textDecoration: 'none',color:'royalblue' }}>
                    <div className='divs'>
                        <BsPersonPlusFill style={{fontSize:'4vh'}}>
                        </BsPersonPlusFill>
                        <span style={{paddingLeft:'0.5vw',fontSize:'60%'}}>Register</span>
                    </div>
                    </Link>
                )
            }
              </Dropdown.ItemText>
              <Dropdown.ItemText>
              {
            (props.loginStatus && (localStorage.getItemText('type'))==='admin') && (
                <Link to='/dashboard'>
                <div className='divs'>
                <MdDashboard style={{fontSize:'4vh'}}></MdDashboard>
                <span style={{paddingLeft:'0.5vw',fontSize:'60%'}}>Dashboard</span>
            </div>
                </Link>
            )}
              </Dropdown.ItemText>
              <Dropdown.ItemText>
              {
            (props.loginStatus ) && (
                <Button variant='link'style={{color:'red' }}>
                <div className='divs'>
                <GoSignOut style={{color:'red',fontSize:'4vh'}}></GoSignOut>
                <span style={{paddingLeft:'0.5vw',fontSize:'70%'}}
                onClick={()=>{
                    localStorage.setItem('token','')
                    localStorage.setItem('data','')
                    localStorage.setItem('type','')
                    navigate('/signin')
                }}
                >Signout</span>
                </div>
                </Button>
            
            )
           }
              </Dropdown.ItemText>

            </DropdownButton>
            
          )}
        />
                
                {/* <Link path="/signin"  >Signin
                
                </Link> */} 
            </Nav>

        
    </Navbar>
  )
}



export default SimpleAccordion;


// import React from 'react'
// import {Container,FormControl,Navbar,Dropdown,Nav,Badge, Row} from "react-bootstrap";
// import "./navbar.css"
// import {AiFillShop} from 'react-icons/ai'
// import { FaHeart,FaSignInAlt ,FaShoppingCart} from "react-icons/fa";
// import { GoSignOut} from "react-icons/go";
// import { BsPersonPlusFill } from "react-icons/bs";
// import { MdDashboard } from "react-icons/md";
// import {BrowserRouter,Route, Link, useNavigate} from "react-router-dom"
// import Stack from 'react-bootstrap/Stack'
// import InputGroup from "react-bootstrap/InputGroup";
// import Button from "react-bootstrap/Button";    
// import { useState,useEffect } from 'react';


// const NavBar = (props) => {
    
//     const navigate=useNavigate()
    
    
//   return (

//     <Navbar  style={{borderBottom:'2px solid black',minWidth:'500px',backgroundColor:'aquawhite'}}>
        
//             <Navbar.Brand style={{marginLeft:'0vw'}}>
//                  <strong style={{fontFamily:' “Playfair Display”, “Didot”, "Times New Roman", Times, serif'}}>🏠 ShopForHome</strong>
//             </Navbar.Brand>
            
//             <Nav className={'ms-auto'} style={{marginRight:'5vw'}}>
//                 <Stack  direction='horizontal' className="stack">
//                 <Link to='/' style={{ textDecoration: 'none',color:'green' }}>
//                 <div className='divs'>
//                 <AiFillShop  style={{fontSize:'4vh'}}>

//                 </AiFillShop><span style={{paddingLeft:'0.5vw' , fontSize:'60%'}}>Shop</span>
//                 </div>
//                 </Link>
                
//             {
//                 (props.loginStatus && (localStorage.getItem('type'))==='user') && (
//                     <>
//                     {/* <Link to='/cart' style={{ textDecoration: 'none',color:'orange' }}>
//                     <div className='divs'>
//                          <FaShoppingCart >
//                          </FaShoppingCart> <span style={{paddingLeft:'0.5vw', fontSize:'60%'}}>cart</span>
//                      </div>
//                     </Link> */}
//                      <Link to='/wishlist' style={{ textDecoration: 'none',color:'#FF1493' }}>
//                      <div className='divs'>
//                          <FaHeart style={{fontSize:'4vh'}}>
//                          </FaHeart>
//                          <span style={{paddingLeft:'0.5vw',fontSize:'60%'}}>Wishlist</span>
//                      </div>
//                      </Link>
//                      <Link to='/cart' style={{ textDecoration: 'none',color:'	#FF8C00' }}>
//                     <div className='divs'>
//                          <FaShoppingCart style={{fontSize:'4vh'}}>
//                          </FaShoppingCart> <span style={{paddingLeft:'0.5vw', fontSize:'60%'}}>cart</span>
//                      </div>
//                     </Link>
//                     </>
//                 )
//             }
//             {
//                 (!props.loginStatus) && (
//                     <>
//                     <Link to='/signin' style={{ textDecoration: 'none',color:'royalblue' }}>
//                     <div className='divs'>
//                         <FaSignInAlt style={{fontSize:'4vh'}}>
//                         </FaSignInAlt >
//                         <span style={{paddingLeft:'0.5vw',fontSize:'60%'}}>Signin</span>
//                     </div>
//                     </Link>
//                     <Link to='/signup' style={{ textDecoration: 'none',color:'royalblue' }}>
//                     <div className='divs'>
//                         <BsPersonPlusFill style={{fontSize:'4vh'}}>
//                         </BsPersonPlusFill>
//                         <span style={{paddingLeft:'0.5vw',fontSize:'60%'}}>Register</span>
//                     </div>
//                     </Link>
//                     </>
//                 )
//             }
//            {
//             (props.loginStatus && (localStorage.getItem('type'))==='admin') && (
//                 <Link to='/dashboard'>
//                 <div className='divs'>
//                 <MdDashboard style={{fontSize:'4vh'}}></MdDashboard>
//                 <span style={{paddingLeft:'0.5vw',fontSize:'60%'}}>Dashboard</span>
//             </div>
//                 </Link>
//             )}
//             {
//             (props.loginStatus ) && (
//                 <Button variant='link'style={{color:'red' }}>
//                 <div className='divs'>
//                 <GoSignOut style={{color:'red',fontSize:'4vh'}}></GoSignOut>
//                 <span style={{paddingLeft:'0.5vw',fontSize:'70%'}}
//                 onClick={()=>{
//                     localStorage.setItem('token','')
//                     localStorage.setItem('data','')
//                     localStorage.setItem('type','')
//                     navigate('/signin')
//                 }}
//                 >Signout</span>
//                 </div>
//                 </Button>
            
//             )
//            }
//             </Stack>
                
//                 {/* <Link path="/signin"  >Signin
                
//                 </Link> */} 
//             </Nav>

        
//     </Navbar>
//   )
// }



// export default NavBar;


