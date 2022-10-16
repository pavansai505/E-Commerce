import React from 'react';
const AboutPage = ({
  title = 'Title',
  description = 'Description',
}) => (
 
    <div className='jumbotron ' style={{ backgroundColor: '#047BD5' ,height:'30vh',paddingTop:'10vh',minWidth:'400px'}}>
      <h1 style={{color:'gold',fontWeight:'bolder'}}>{title}</h1>
    </div>
  
);

export default AboutPage;
