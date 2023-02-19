import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Button, Collapse, TextField } from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Filter (props){
    const [value, setValue] = React.useState([0, 20]);
    const [value2, setValue2] = React.useState([0, 30000]);
    const [location, setLocation] = React.useState("");
    const [name, setName] = React.useState("");
    const [expanded, setExpanded] = React.useState(false);
    const marks = [
        {
          value: 0,
          label: '0',
        },
        {
          value: 20,
          label: '20',
        },]

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const handleChange2 = (event, newValue) => {
        setValue2(newValue);
      };
    const handleExpandClick = () => {
        setExpanded(!expanded);
      };
      const getUpData = () => {
        props.getUpData([value, value2, location, name]);
      };
    
    return ( 
        <Box sx={{  margin: "10px" }}>
        <button className='filter' onClick={handleExpandClick}>{!expanded? "Show Filter": "Hide filter"}</button>
        <Collapse sx={{ width: "100%"}} in={expanded} timeout="auto">
           <Box sx={{   padding: 0,
  margin: 0, width: "100%" , display:'flex',height:"130px", gap: "20px", justifyContent: "center", alignItems: "center"}}>
        <label>Slots</label>
        <Slider sx={{  width: "25%" ,padding: 0,
  margin: 0 }}
  min={0}
  max={20}
          getAriaLabel={() => 'Temperature range'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="on"
          
          //getAriaValueText={valuetext}
        />
        <label htmlFor="">Price</label>
           <Slider sx={{ width: "25%" }}
           min={0}
           max={30000}
        getAriaLabel={() => 'Temperature range'}
        value={value2}
        onChange={handleChange2}
        valueLabelDisplay="on"
        //getAriaValueText={valuetext}
      />
      <TextField sx={{color: 'black' }}  id="outlined-basic" onChange={(e) => setLocation(e.target.value)}  value={location} label="Location" variant="outlined" />
      <TextField sx={{color: 'black' }}  id="outlined-basic" onChange={(e) => setName(e.target.value)}  value={name} label="Name" variant="outlined" />
      <Button sx={{color: 'black' }} onClick={getUpData} variant="text">Filter</Button>
      </Box>
    
        </Collapse></Box>
      );
    
  }
