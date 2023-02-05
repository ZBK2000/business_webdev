import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import TrackModel from "./db.js";
import cors from "cors"
import UserModel from "./usersdb.js";
config()
const app = express()
app.use(express.json())
app.use(cors())
app.post("/", async function(req, res){
    const newTrack = new TrackModel(req.body.track)
    await newTrack.save()
    const allTrack = await TrackModel.find()
    const doc = await UserModel.findOneAndUpdate({  user: req.body.user }, { $push: { tracks: req.body.track.name}}, { new: true });
    res.send(allTrack)
})


app.get("/", async (req, res)=>{
    const allTrack = await TrackModel.find()
    res.send(allTrack)
})
app.post("/signup", async function(req, res){
    const newUser = new UserModel(req.body)
    const existingUser = await UserModel.findOne({user: newUser.user, password: newUser.password});
    if(existingUser){
        return res.status(409).send("User already exists")
    }
    await newUser.save()
    res.send("successfully registrated")
})
app.post("/login", async function(req, res){
    console.log(req.body)
    UserModel.exists({user: req.body.user, password:req.body.password}, function (err, result) {
        if (err) return handleError(err);
        if(result){
          res.send("Successfully logged in!");
        } else {
          res.send("something went wrong");
        }
      });
})

app.post("/tracks", async function(req, res){
  const existingTrack = await TrackModel.findOne({name: req.body.id});
  let text
  for (let booked in req.body.h3s){
    if (req.body.h3s[booked].id ==req.body.time_id){
        text = req.body.h3s[booked].text.split(" ")[0]
        break
    }
  }
  await UserModel.findOneAndUpdate({  user: req.body.user }, { $push: { booked_tracks: `${req.body.id}: ${req.body.rightDay} ${text}`}}, { new: true });
  console.log(req.body)
  
  if(existingTrack){
    if (req.body.h3s){
      const rightDay = req.body.rightDay
    const doc = await TrackModel.findOneAndUpdate({  name: req.body.id }, { $set: { [`booked.${rightDay}`]: req.body.h3s}}, { new: true });
    console.log(doc)
  res.send(doc)}
    else{
      res.send(existingTrack)
    }
  
}}) 
app.post("/user", async function(req, res){
  console.log(req.body)
  const user = await UserModel.findOne({user: req.body.id});
  if (user){
    console.log(user)
    res.send(user)
  }
    });
app.post("/cancel", async function(req, res){
      console.log(req.body)
      const doc = await TrackModel.findOne({  name: req.body.nameOfTrack })
      console.log(doc)
      const bookedTimes = doc.booked[req.body.rightDay]
      for (let times in bookedTimes){
        if (bookedTimes[times].text.indexOf(req.body.timeline.split(" ")[0]) !== -1) {
          console.log(req.body.timeline.split(" ")[0])
          if(!bookedTimes[times].slots.includes("")){
            bookedTimes[times].color = "black"
            bookedTimes[times].text = `${req.body.timeline.split(" ")[0]} `
          }
          bookedTimes[times].slots = bookedTimes[times].slots.map(slot => {
            if (slot == req.body.id){
              return ""

            }
            return slot
          })
          
          break
        }
      }
      await TrackModel.findOneAndUpdate({  name: req.body.nameOfTrack }, { $set: { [`booked.${req.body.rightDay}`]: bookedTimes}}, { new: true });
      await UserModel.findOneAndUpdate({  user: req.body.id }, { $pull: { booked_tracks: `${req.body.nameOfTrack}: ${req.body.rightDay} ${req.body.timeline}`}}, { new: true })
      console.log("hah")
      res.send("success")


        });
app.post("/newDay", async function(req, res){
  const doc = await TrackModel.findOneAndUpdate({  name: req.body.id }, { $set: { [`booked.${req.body.rightDay}`]: req.body.h3s}}, { new: true });
  console.log(doc)
  res.send(doc)
})
mongoose.connect(process.env.MONGO_URL).then(()=>{console.log("success")})
app.listen(3000)
