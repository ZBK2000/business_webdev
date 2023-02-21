import { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import AvailablePlaces from "./avalaiblePlaces";
import { TextField } from "@mui/material";


export default function register (props){
        const navigate = useNavigate()
        const [name, setName] = useState("");
        const [price, setPrice] = useState("");
        const [location, setLocation] = useState("");
        const [description, setDescription] = useState("");
        const [slots, setSlots] = useState(4)
        const [img, setImg] =useState("")

        const avalaibleTimes_initial = [
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
        

        const registerTrack = async (event) => {
            console.log(slots)
            const slot_places = Array(parseInt(slots)).fill("");
            console.log(slot_places)
            const avalaibleTimes =  avalaibleTimes_initial.map((item) => {
                item.slots = [...slot_places];
                return item;
              });
              console.log(avalaibleTimes, slots)
            const avalaibleTimesFor7Days = {}
            const next7Days = getNext7Days()
            next7Days.forEach(key => {
                avalaibleTimesFor7Days[key] = avalaibleTimes})

                 
            event.preventDefault();
           console.log(img)
           let formData = new FormData()
           for (let i = 0; i < img.length; i++) {
            console.log(img[i])
            formData.append("img_urls", img[i]);
           }
            const data = {track: {name, price, location, description, slot_number: slots, booked: avalaibleTimesFor7Days, /* next7Days, */ }, user:props.getDownData2};
          /*   formData.append("track[name]", data.track.name);
            formData.append("track[price]", data.track.price);
            formData.append("track[location]", data.track.location);
            formData.append("track[description]", data.track.description);
            formData.append("track[slots]", data.track.slot_number);
            formData.append("track[booked]", data.track.booked);
            formData.append("user", data.user); */

            const response = await fetch(`http://localhost:3000/`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    
                    "Content-Type": "application/json"
                }
            });
           // const allTrack = await response.json();
      
            
            
            formData.append("track", name)
            const res = await fetch(`http://localhost:3000/img`, {
                method: "POST",
                body: formData
            })
            const allTrack = await res.json()
            if (allTrack){
              props.getUpData(allTrack)
            props.getUpData2(slots)
            navigate("/")}
        }
        
        return (
            
            <div>
                <Header title="new track registration" success={props.getDownData} name={props.getDownData2}/>
         
            <form onSubmit={registerTrack}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" onChange={(e) => setName(e.target.value)} />
                {/* <TextField id="outlined-basic" sx={{color: "#3c3c3c" , "& .input:focus !important":   {color:"#3c3c3c"}}} label="Location"  variant="standard">Name</TextField> */}
                <label htmlFor="price">Price:</label>
                <input type="number" id="price" onChange={(e) => setPrice(e.target.value)} />
                <label htmlFor="location">Location:</label>
                <input type="text" id="location" onChange={(e) => setLocation(e.target.value)} />
                 <label htmlFor="slots">Maximum slots:</label>
                <input type="number" step="1" id="slots" onChange={(e) => setSlots(e.target.value)} /> 
                <label htmlFor="img">Images:</label>
                <input type="file" id="img" multiple onChange={(e) => setImg(e.target.files)} />
                <label htmlFor="desc">Description:</label>
                <textarea  id="desc" onChange={(e) => setDescription(e.target.value)} />
                <button>Submit</button>
            </form>
            
            </div>
        );
    
}