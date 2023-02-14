import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header (props){
    
    console.log(props.success)
    return (<div className="header">
        <h1>{props.title}</h1>
       
        {props.success=="Successfully logged in!" ?"": <Link className="links" to="/login/home"><h2>Login</h2></Link> }
        {props.success=="Successfully logged in!" ?"":<Link className="links" to="/signup"><h2>Sign up</h2></Link>   }
        
        {props.success=="Successfully logged in!" ?<Link className="links" to="/register"><h2>Register new track</h2></Link>: "" }
        
        <Link className="links" to="/"><h2>Main Page</h2></Link>
        {props.success=="Successfully logged in!" ? <Link className="links" to="/user"><h2>{props.name}</h2></Link>: "" }
        
</div>
    )
}