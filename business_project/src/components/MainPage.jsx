import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "./Footer";

export default function MainPage (props){
    const navigate = useNavigate()
    const [id, setId] = useState("")
    console.log(typeof props.allTrack)
    console.log(props.allTrack, props.getDownData, "yeaaah")
    function reNavigate(item){
        if (props.getDownData=="Successfully logged in!"){
            navigate(`/tracks/${item.name}`)
        }
        else{
            navigate(`/login`)
        }
         
         
    }
     const newTracks = props.allTrack.map(function(item){
        return (
            <div className="tracks" onClick={() => reNavigate(item)} key={item.name}>
           {/*  {props.getDownData=="Successfully logged in!"?<Link className="links" to={`/tracks/${item.name}`}><h3>{item.name}</h3></Link>:<Link className="links" to={`/login`}><h3>{item.name}</h3></Link>} */}
           <h3>{item.name} {item.slot_number}P</h3>
            <h3>{item.price}</h3>
            <h3>{item.location}</h3>
            </div> 
        )
    })  
    return (<div>
        <Header title="Fantastic business" success={props.getDownData} name={props.getDownData2} />
        

    <div className="container">{newTracks}</div>
   

       
    </div>)
}