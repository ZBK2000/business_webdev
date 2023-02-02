import { useState } from "react";
import Header from "./Header";

export default function Login (props){
    const [user, setUser]= useState("")
   const  [password, setPassword]= useState("")
    const [registrateds, setRegistrateds] = useState("")
    console.log("huhu")
    const createDeck = async (event) => {
        event.preventDefault();
        const data = {user, password};
        const response = await fetch(`http://localhost:3000/login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const accepted = await response.text();
        
        setRegistrateds(accepted)
        props.getUpData(accepted)
        if (accepted =="Successfully logged in!"){
            props.getUpData2(user)
        }
        console.log(registrateds)
        

}

    return (<div className="logindiv">
        <Header title="Login to your account" success={registrateds} name={user}/>
        {registrateds=="" ?
        <form onSubmit={createDeck}>
             <div><label htmlFor="names">Name:</label>
                <input type="text" id="names" onChange={(e) => setUser(e.target.value)} />
                <label htmlFor="prices">Password:</label>
                <input type="text" id="prices" onChange={(e) => setPassword(e.target.value)} />
                <button>Submit</button></div>
            </form> : ""}
            {registrateds == "Successfully logged in!" ? <h1 className="success">Welcome {user}</h1>:""}
            
            <h1 className="success">{registrateds}</h1>
            {registrateds == "something went wrong" ? <h1 className="success">Please try again</h1>:""}
    </div>)
}