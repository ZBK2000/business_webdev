import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "./Footer";

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { grey } from "@mui/material/colors";
import { height } from "@mui/system";
import Filter from "./Filter";
import { useEffect } from "react";

export default function MainPage (props){
    const navigate = useNavigate()
    const [id, setId] = useState("")
    const [filterItems, setFilterItems] = useState("")
    console.log(typeof props.allTrack)
    console.log(props.allTrack, props.getDownData, "yeaaah")
    function reNavigate(item){
        if (props.getDownData=="Successfully logged in!"){
            navigate(`/tracks/${item.name}`)
        }
        else{
            navigate(`/login/${item.name}`)
        }
         
         
    }

console.log(filterItems)
let filteredData = [];

  
  if (filterItems){
  props.allTrack.forEach((item) => {
    const shouldFilterLocation = filterItems[2] !== '';
    const shouldFilterName = filterItems[3] !== '';
    console.log(shouldFilterLocation, shouldFilterName, filterItems[0][0],filterItems[0][1],item.slot_number)
  
    if (
      (!shouldFilterLocation || item.location === filterItems[2]) &&
      (!shouldFilterName || item.name === filterItems[3]) &&
      (item.slot_number < filterItems[0][1] && item.slot_number > filterItems[0][0] ) &&
      (item.price < filterItems[1][1] && item.price > filterItems[1][0] )
    ) {
      filteredData.push(item);
    } else if (!shouldFilterLocation && !shouldFilterName && (item.slot_number < filterItems[0][1] && item.slot_number > filterItems[0][0] ) && 
    (item.price < filterItems[1][1] && item.price > filterItems[1][0] )) {
      // if both filter criteria are empty, include the item in the filtered data
      filteredData.push(item);
    }
  })} else {
    filteredData = props.allTrack
  }


console.log(filteredData)
     const newTracks = filteredData.map(function(item){
        console.log(item.name)
        return (
                <Card className="tracks" sx={{ maxWidth: 345, backgroundColor: "#7B8FA1"}} onClick={() => reNavigate(item)} key={item.name}>
                  <CardMedia component="img"
                    sx={{ height: 140 }}
                    
                    src={`http://localhost:3000/img?user_id=${item.name}&number=${0}`}
                    title=""
                  /> 
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {item.name} 
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {item.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {item.price}FT
                    </Typography>
                   
                    <Typography variant="body2" color="text.secondary">
                    {item.slot_number}P
                    </Typography>
                  </CardContent>
                 {/*  <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                  </CardActions> */}
                </Card>
              
          /*   <div className="tracks" onClick={() => reNavigate(item)} key={item.name}>
             {props.getDownData=="Successfully logged in!"?<Link className="links" to={`/tracks/${item.name}`}><h3>{item.name}</h3></Link>:<Link className="links" to={`/login`}><h3>{item.name}</h3></Link>} 
           <h3>{item.name} {item.slot_number}P</h3>
            <h3>{item.price}</h3>
            <h3>{item.location}</h3>
            </div>  */
        )
    })  
    return (<div>
      
        <Header title="Fantastic business" success={props.getDownData} name={props.getDownData2} />
        
        <Filter getUpData={setFilterItems}/>
    <div className="container">{newTracks}</div>
   

       
    </div>)
}