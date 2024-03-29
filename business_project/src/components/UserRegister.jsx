import { Typography } from "@mui/material";
import { useState } from "react";
import Header from "./Header";


export default function UserRegister (){
    const [user, setUser]= useState("")
   const  [password, setPassword]= useState("")
    const [registrated, setRegistrated] = useState("")
    console.log("huhu")
    const createDecks = async (event) => {
        event.preventDefault();
        const data = {user, password};
        const response = await fetch(`http://localhost:3000/signup`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const accepted = await response.text();
        console.log(accepted)
        setRegistrated(accepted)}
        
    return (<div>
        <Header title="Create your account" />
        {registrated=="" ?
        <form onSubmit={createDecks}>
             <div><label htmlFor="name"><Typography>Name:</Typography> </label>
                <input type="text" id="name" onChange={(e) => setUser(e.target.value)} />
                <label htmlFor="price"><Typography>Password:</Typography> </label>
                <input type="text" id="price" onChange={(e) => setPassword(e.target.value)} />
                <button><Typography>Submit</Typography> </button></div>
            </form> : ""}
            <Typography sx={{marginTop:"15px"}} variant="h5" className="success">{registrated}</Typography>
    </div>)
}