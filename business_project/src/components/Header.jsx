import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
export default function Header (props){
    
    console.log(props.success)
   /*  return (<div className="header">
        <h1>{props.title}</h1>
       
        {props.success=="Successfully logged in!" ?"": <Link className="links" to="/login/home"><h2>Login</h2></Link> }
        {props.success=="Successfully logged in!" ?"":<Link className="links" to="/signup"><h2>Sign up</h2></Link>   }
        
        {props.success=="Successfully logged in!" ?<Link className="links" to="/register"><h2>Register new track</h2></Link>: "" }
        
        <Link className="links" to="/"><h2>Main Page</h2></Link>
        {props.success=="Successfully logged in!" ? <Link className="links" to="/user"><h2>{props.name}</h2></Link>: "" }
        
</div>
    ) */

    const navigate = useNavigate()
    function navigateFunction(e, nameOfUser){
        console.log(e.target)
        if (e.target.innerText == "LOGIN"){
            navigate("/login/home")
        }
        else if (e.target.innerText == "SIGN UP"){
            navigate("/signup")
        }
        else if (e.target.innerText == "REGISTER TRACK"){
            navigate("/register")
        }
        else if (e.target.innerText == "Business"){
            navigate("/")
        }
        else {
            navigate("/user")
        }
        
    }
    return (
      <Box sx={{ flexGrow: 1}}>
        <AppBar position="static">
          <Toolbar>
          <Typography  onClick={(e)=>navigateFunction(e, props.name)} variant="h6" component="div" sx={{ flexGrow: 1, cursor: "pointer" }}>
          Business
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {props.title == "Fantastic business"?"": props.title}
            </Typography>
            <Box>
         
            {props.success=="Successfully logged in!" ?"":<Button  onClick={(e)=>navigateFunction(e, props.name)} color="inherit">Login</Button>}
{props.success=="Successfully logged in!" ?"":<Button  onClick={(e)=>navigateFunction(e, props.name)} color="inherit">Sign up</Button> }

{props.success=="Successfully logged in!" ?<Button   sx = {{margin:"15px"}} onClick={(e)=>navigateFunction(e, props.name)} color="inherit">Register Track</Button>: "" }


{props.success=="Successfully logged in!" ? <Button  onClick={(e)=>navigateFunction(e, props.name)} color="inherit"> <AccountCircle /></Button>: "" }
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }