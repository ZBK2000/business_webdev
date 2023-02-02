
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

export default function User (props){

    const id = props.getDownData2
    const [userData, setUserData] = useState(null);
    const [render, setRender] = useState("ha")
    console.log(render, "first")

    async function cancel(item){
        const nameOfTrack = item.split(": ")[0]
        const timeline = item.split(": ")[1]
        
        
        console.log(render,"itt")
        const response = await fetch("http://localhost:3000/cancel",  {
            method: "POST",
            body: JSON.stringify({nameOfTrack, timeline, id}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        
        console.log(render, "?")
        setRender(item)
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
         return(<h2 className="booked-times" onClick={()=>cancel( item)}><li>{item}</li></h2>)
        }), tracks:data.tracks.map(function(item){
            return(<h2 className="createdTracks"><li>{item}</li></h2>)
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