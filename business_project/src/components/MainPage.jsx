import Header from "./Header";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function MainPage (props){
    const [id, setId] = useState("")
    console.log(typeof props.allTrack)
    console.log(props.allTrack, props.getDownData, "yeaaah")
     const newTracks = props.allTrack.map(function(item){
        return (
            <div className="tracks" key={item.name}>
            {props.getDownData=="Successfully logged in!"?<Link className="links" to={`/tracks/${item.name}`}><h3>{item.name}</h3></Link>:<Link className="links" to={`/login`}><h3>{item.name}</h3></Link>}
            
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