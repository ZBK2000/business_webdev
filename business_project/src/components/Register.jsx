import { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import AvailablePlaces from "./avalaiblePlaces";

export default function register (props){
        const navigate = useNavigate()
        const [name, setName] = useState("");
        const [price, setPrice] = useState("");
        const [location, setLocation] = useState("");
        const [description, setDescription] = useState("");
        //const [slots, setSlots] = useState(4)
        const avalaibleTimes = [
            { id: 1, text: "8-10 ", color: "black" ,slots: ["","","",""]},
            { id: 2, text: "10-12 ", color: "black" ,slots: ["","","",""]},
            { id: 3, text: "12-14 ", color: "black" ,slots: ["","","",""]},
            { id: 4, text: "14-16 ", color: "black" ,slots: ["","","",""]},
            { id: 5, text: "16-18 ", color: "black" ,slots: ["","","",""]},
            { id: 6, text: "18-20 ", color: "black" ,slots: ["","","",""]},
            { id: 7, text: "20-22 ", color: "black" ,slots: ["","","",""]}
          ]
          
          function getNext7Days() {
            const next7Days = [];
            const today = new Date();
            
            for (let i = 0; i < 7; i++) {
              const nextDay = new Date(today.getTime());
              nextDay.setDate(today.getDate() + i);
              const year = nextDay.getFullYear();
              const month = nextDay.getMonth() + 1;
              const day = nextDay.getDate();
              next7Days.push(`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);
            }
          
            return next7Days;
          } 
        const avalaibleTimesFor7Days = {}
        const next7Days = getNext7Days()
        next7Days.forEach(key => {
            avalaibleTimesFor7Days[key] = avalaibleTimes})

        const registerTrack = async (event) => {
            event.preventDefault();
            const data = {track: {name, price, location, description, booked: avalaibleTimesFor7Days, next7Days}, user:props.getDownData2};
            const response = await fetch(`http://localhost:3000/`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const allTrack = await response.json();
        
            props.getUpData(allTrack)
            //props.getUpData2(slots)
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
                {/* <label htmlFor="slots">Maximum slots:</label>
                <input type="number" step="1" id="slots" onChange={(e) => setSlots(e.target.value)} /> */}
                <label htmlFor="desc">Description:</label>
                <textarea  id="desc" onChange={(e) => setDescription(e.target.value)} />
                <button>Submit</button>
            </form>
            
            </div>
        );
    
}