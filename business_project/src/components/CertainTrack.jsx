import Header from "./Header";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Next7DaysDropdown from "./nextSevenDay";

export default function CertainTrack (props){
  const [h3s, setH3s] = useState([
    { id: 1, text: "8-10 ", color: "black" },
    { id: 2, text: "10-12 ", color: "black" },
    { id: 3, text: "12-14 ", color: "black" },
    { id: 4, text: "14-16 ", color: "black" },
    { id: 5, text: "16-18 ", color: "black" },
    { id: 6, text: "18-20 ", color: "black" },
    { id: 7, text: "20-22 ", color: "black" }
  ]);
 // const [track, setTrack] = useState("")
   const [lastClickedId, setLastClickedId] = useState(null);
   const [errorhandler, setErrorHandler] = useState("")
const handleClick = async (id) => {
    setH3s(h3s.map((h3) => {
      if (h3.id === id) {
        return {
          ...h3,
          text: h3.text + "booked by " + props.getDownData2 ,
          color: "red",
        };
      }
      return h3;
    }));
    setLastClickedId(id);
    console.log(id)
};

useEffect(() => {
    async function fethcing(){
    if(lastClickedId){
    const data = {h3s: h3s, id: nameOfTrack, user: props.getDownData2, time_id: lastClickedId};
    console.log(data, "hanyszor")
   const response = await fetch(`http://localhost:3000/tracks`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"}
    })
    const trackData = await response.json()
    try {
      setH3s(trackData.booked)
    } catch (error) {
      console.log(error)
    }
    
    }}
    fethcing()
    props.getUpData(h3s)
}, [lastClickedId])
    const {id} = useParams()
    
    
    console.log(id, h3s)
    
    let desc 
    let nameOfTrack
    let trackNumber
   try {
    for (let track in props.allTrack){
    console.log(track)
    if (props.allTrack[track].name == id){
        desc = props.allTrack[track].description
        nameOfTrack = props.allTrack[track].name
        trackNumber = track
        break
    }
}


console.log(desc, nameOfTrack, trackNumber,props.allTrack[trackNumber], props.allTrack)
useEffect(()=>{
  try {
    setH3s(props.allTrack[trackNumber].booked)
  } catch (error) {
    setErrorHandler("x")
  } }, []) 
    
   } catch (error) {
    console.log(error)
   } 
    
    

    return (<div>
        <Header title={id}  success={props.getDownData} name={props.getDownData2}/>
         <Next7DaysDropdown/> 
         {errorhandler ?<h1>Please log in to see the page of this track</h1>: <div><h1>{desc}</h1>
        <div className="booking-timelines">
        {h3s.map((h3) => (<div  className="timeline-div">
        <h3 className="timeline"
        key={h3.id}
          style={{ color: h3.color }}
          onClick={h3.color === "red" ? ()=>{}: () => handleClick(h3.id) }
        >
          {h3.text}
        </h3></div>
      ))}
        </div></div> }
       
    </div>)
}