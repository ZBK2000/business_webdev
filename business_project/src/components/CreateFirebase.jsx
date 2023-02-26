
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import Header from "./Header";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function UserRegisterWithFirebase (){
    const [email, setEmail]= useState("")
   const  [password, setPassword]= useState("")
    const [registrated, setRegistrated] = useState("")
    const [nameOfUser, setNameOfUser] = useState("");
    const navigate = useNavigate()
    console.log("huhu")
    /* const  [user, setUser]= useState("") */

    const {createUser} = UserAuth()
    const {user} = UserAuth()
    const {logout} = UserAuth()
    if(user){
      navigate("/")
    }



    const createUserSubmit = async (event) => {
        event.preventDefault();
       try {
        const data = {user: nameOfUser, password: email};
       const response = await fetch(`http://localhost:3000/signup`, {
           method: "POST",
           body: JSON.stringify(data),
           headers: {
               "Content-Type": "application/json"
           }
       });
       const accepted = await response.text();
       if (accepted==="successfully registrated"){
        const userInfo = await createUser(email, password, nameOfUser)
       }
       else{
        console.log(accepted)
       }
        console.log(userInfo)
       console.log(accepted)
       setRegistrated(accepted)
       } catch (error) {
        console.log("something went wrong")
       }
       
       
       
      
      }
    console.log(user)
    return (<div>
        <Header title="Create your account" />
        {!user ?
        <form onSubmit={createUserSubmit}>
             <div><label htmlFor="name"><Typography>Email:</Typography> </label>
                <input type="email" id="name" onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="names"><Typography>Name:</Typography> </label>
            <input
              type="text"
              id="names"
              onChange={(e) => setNameOfUser(e.target.value)}
            />
                <label htmlFor="price"><Typography>Password:</Typography> </label>
                <input type="password" id="price" onChange={(e) => setPassword(e.target.value)} />
                <button><Typography>Create Account</Typography> </button></div>
            </form> : ""}
            {user && <Typography sx={{marginTop:"15px"}} variant="h5" className="success">successfully created</Typography>}
            

    </div>)
}
