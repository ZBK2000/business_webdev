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
import { UserAuth } from "../context/AuthContext";
;
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Header (props){
    const {user, logout} = UserAuth()
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
    async function logoutFromUser(){
      await logout()
    }

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
    const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
         
            {user ?"":<Button sx={{ display: { xs: 'none', md: 'inline' }}} onClick={(e)=>navigateFunction(e, props.name)} color="inherit">LOGIN</Button>}
{user?"":<Button sx={{ display: { xs: 'none', md: 'inline' }}} onClick={(e)=>navigateFunction(e, props.name)} color="inherit">SIGN UP</Button> }

{user ?<Button   sx = {{display: { xs: 'none', md: 'inline' }, margin:"15px"}} onClick={(e)=>navigateFunction(e, props.name)} color="inherit">REGISTER TRACK</Button>: "" }

{user? <Button  sx={{ display: { xs: 'none', md: 'inline' }}} onClick={logoutFromUser} color="inherit">LOG OUT</Button>: "" }
{user? <Button sx={{ display: { xs: 'none', md: 'inline' }}}  onClick={(e)=>navigateFunction(e, props.name)} color="inherit"> <AccountCircle /></Button>: "" }

<Button sx={{ display: { xs: 'inline', md: 'none' }}} 

 color="inherit"
 id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>  <MenuIcon /></Button>
<Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
       {user ?"":<MenuItem  onClick={(e)=>navigateFunction(e, props.name)} color="inherit">LOGIN</MenuItem>}
{user?"":<MenuItem  onClick={(e)=>navigateFunction(e, props.name)} color="inherit">SIGN UP</MenuItem> }
{user ?<MenuItem    onClick={(e)=>navigateFunction(e, props.name)} color="inherit"><AccountCircle /> </MenuItem>: "" }
{user ?<MenuItem    onClick={(e)=>navigateFunction(e, props.name)} color="inherit">REGISTER TRACK</MenuItem>: "" }

{user? <MenuItem onClick={logoutFromUser} color="inherit"> Log Out</MenuItem>: "" }
      </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }