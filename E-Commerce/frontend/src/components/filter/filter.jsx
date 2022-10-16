import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Col, Row } from 'react-bootstrap';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function Filter(props) {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography >Apply Filters</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Row xs={1} md={4}>
            <Col className='mx-auto'>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label"><strong>Price</strong></FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="asc" control={<Radio />} 
                    label="Low to High" 
                    onClick={()=>{
                        props.typeOfSort(true)
                    }}/>
                    <FormControlLabel value="dsc" control={<Radio />} 
                    label="High to low"
                    onClick={()=>{
                        props.typeOfSort(false)
                      }} />
                    
                </RadioGroup>
                </FormControl>
            </Col>
            
          </Row>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
