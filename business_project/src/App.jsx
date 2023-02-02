import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes, Link } from 'react-router-dom'
import Track from './components/Track'
import MainPage from './components/MainPage'
import CertainTrack from './components/CertainTrack'
import Register from './components/Register'
import UserRegister from './components/UserRegister'
import Login from './components/Login'
import Header from './components/Header'
import User from './components/User'




function App() {
  const [tracks, setTracks] = useState([]);
  const [success, setSuccess] = useState("s")
  const [name, setName] = useState("")
  const [change, setChange] = useState("")
  console.log(tracks, success)
  
 
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:3000/`);
        const data = await response.json();
        setTracks(data);
      } catch (error) { 
        console.error(error);
      }
    }
    fetchData();
    console.log("hello")
  }, [change]);
  console.log(tracks, success,"hfhadsdjkfha", change)
/*   const newTracks = tracks.map(function(item){
    return (
        <div className="tracks">
        <Link to={`/tracks/${item.name}`}><h3>{item.name}</h3></Link>
        <h3>{item.price}</h3>
        <h3>{item.location}</h3>
        </div> 
    )}) */
  return (
    <div>
      {/* <Header title="Awesome" success={success} name={success}/> */}
     {/*   <div className="container">{newTracks}</div> */}
    <Routes>
    <Route path='/' element={<MainPage allTrack={tracks} getDownData={success} getDownData2={name}/>}/>  
    <Route path='/track' element={<Track getDownData={success} getDownData2={name}/>}/>
    <Route path='/register' element={<Register getUpData={setTracks} getDownData={success} getDownData2={name}/>}/>
    <Route path='/tracks/:id' element={<CertainTrack allTrack={tracks} getDownData={success} getDownData2={name} getUpData={setChange}/>}/>
    <Route path='/signup' element={<UserRegister />}/> 
    <Route path='/login' element={<Login getUpData={setSuccess} getUpData2={setName}/>}/>
    <Route path='/user' element={<User getDownData={success} getDownData2={name}/>}/>

    </Routes>
     </div>
      
    
  )
}

export default App
