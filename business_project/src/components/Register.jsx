import { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

export default function register (props){
        const navigate = useNavigate()
        const [name, setName] = useState("");
        const [price, setPrice] = useState("");
        const [location, setLocation] = useState("");
        const [description, setDescription] = useState("");
        const avalaibleTimes = [
            { id: 1, text: "8-10 ", color: "black" },
            { id: 2, text: "10-12 ", color: "black" },
            { id: 3, text: "12-14 ", color: "black" },
            { id: 4, text: "14-16 ", color: "black" },
            { id: 5, text: "16-18 ", color: "black" },
            { id: 6, text: "18-20 ", color: "black" },
            { id: 7, text: "20-22 ", color: "black" }
          ]
        
        const registerTrack = async (event) => {
            event.preventDefault();
            const data = {track: {name, price, location, description, booked: avalaibleTimes}, user:props.getDownData2};
            const response = await fetch(`http://localhost:3000/`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const allTrack = await response.json();
        
            props.getUpData(allTrack)
            navigate("/")
        }
    
        return (
            
            <div>
                <Header title="new track registration" success={props.getDownData} name={props.getDownData2}/>
         
            <form onSubmit={registerTrack}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" onChange={(e) => setName(e.target.value)} />
                <label htmlFor="price">Price:</label>
                <input type="text" id="price" onChange={(e) => setPrice(e.target.value)} />
                <label htmlFor="location">Location:</label>
                <input type="text" id="location" onChange={(e) => setLocation(e.target.value)} />
                <label htmlFor="desc">Description:</label>
                <textarea  id="desc" onChange={(e) => setDescription(e.target.value)} />
                <button>Submit</button>
            </form>
            
            </div>
        );
    
}