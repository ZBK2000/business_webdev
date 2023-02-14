
import { Button, Paper } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";

export default function User (props){
    const navigate = useNavigate()

    const id = props.getDownData2
    const [userData, setUserData] = useState(null);
    const [render, setRender] = useState("ha")
    console.log(render, "first")

    async function cancel(item){
        const nameOfTrack = item.split(": ")[0]
        const timeline = item.split(": ")[1].split(" ").slice(1).join(" ")
        const rightDay = item.split(": ")[1].split(" ")[0]
        
        
        console.log(render,"itt")
        const response = await fetch("http://localhost:3000/cancel",  {
            method: "POST",
            body: JSON.stringify({nameOfTrack, timeline, id, rightDay}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        props.getUpData(item)
        console.log(render, "?")
        setRender(item)
    }

    function see (item){
       console.log(item)
       navigate(`/tracks/${item.split(":")[0]}`)
    }
    async function deleteTrack(item){
        const dataToDelete = {id, track:item.split(":")[0]}
        console.log(dataToDelete)
        const response = await fetch("http://localhost:3000/delete",  {
            method: "POST",
            body: JSON.stringify(dataToDelete),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const deleted = await response.text()
        if (deleted == "deleted"){
        props.getUpData([item, "deleted"])
        console.log(render, "?")
        setRender([item, "deleted"])}
    }
    console.log(render, "nyii")
    useEffect(()=>{    async function fetching_user(){
        const response = await fetch("http://localhost:3000/user",  {
            method: "POST",
            body: JSON.stringify({id}),
            headers: {
                "Content-Type": "application/json"
            }
        })
    const data= await response.json()
    console.log(data, "huhu")
        setUserData({booked_tracks: data.booked_tracks.map(function(item){
         return(<Paper className="booked-times" elevation={6}><h2  className="booked-times-h2" ><li>{item}</li></h2><Button className="cancel-see" onClick={()=>cancel( item)} variant="text">X</Button><Button  onClick={()=>see( item)} className="cancel-see" variant="text">See</Button></Paper>)
        }), tracks:data.tracks.map(function(item){
            return(<Paper className="booked-times" elevation={6}><h2 className="booked-times-h2"><li>{item}</li></h2><Button className="cancel-see"  onClick={()=>deleteTrack( item)}   variant="text">X</Button><Button onClick={()=>see( item)} className="cancel-see" variant="text">See</Button></Paper>)
           })} )}
        fetching_user()}, [render])
    

    console.log(props.success, userData)

    
    return ( <div > <Header title="account info" success={props.getDownData} name={props.getDownData2}></Header>
        <div className="userData">
        {userData ? (
          <>
          <h1 className="userTrackInfo-1">your tracks:</h1>
            {userData.tracks}
            <h1 className="userTrackInfo-2">booked tracks:</h1>
            {userData.booked_tracks}
            <div></div>
          </>
        ) : (
          <div><h1>Please log in to see user information</h1></div>
        )}
      </div>
    
       
       
       
        
</div>
    )
}