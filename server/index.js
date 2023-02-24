import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import TrackModel from "./db.js";
import cors from "cors"
import UserModel from "./usersdb.js";
import multer from "multer";
import path from "path"
config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage })
app.post("/img", upload.array("img_urls") ,async function(req, res){
  console.log(Date.now())
  console.log(req.body.track)
  console.log(req.body)
  console.log(req.files)
  const existingTrack = await TrackModel.findOneAndUpdate({  name: req.body.track }, { $set: { img_urls: req.files}}, { new: true });
  const allTrack = await TrackModel.find()
  res.send(allTrack)


  
})
app.get("/img", async function(req, res){
  console.log(req.query)
  const track = await TrackModel.findOne({name: req.query.user_id});
  res.sendFile(path.join(process.cwd(), "public", "images", track.img_urls[req.query.number].filename));
})
app.post("/" ,async function(req, res){
  console.log(req.body)
 
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
    const existingUser = await UserModel.findOne({ $or: [
      { user: newUser.user },
      { password: newUser.password }
    ]});
    if(existingUser){
        return res.status(409).send("User already exists")
    }
    await newUser.save()
    res.send("successfully registrated")
})
app.post("/login", async function(req, res){
    console.log(req.body)
    const user = await UserModel.findOne({ password:req.body.password})
    if (user) {
      res.send(user);
    } else {
      res.status(404).send('User not found');
    }
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

app.post("/delete", async function(req, res){
  const id = req.body.id;
  const track = req.body.track;
  console.log(id, track, "..")
  await TrackModel.findOneAndDelete({  name: track })
  

  // search for the user based on their ID
  const users = await UserModel.find({});

  for (const user of users) {
    // retrieve the user's booked array and filter out any instances that contain the given track as a substring
    const filteredBooked = user.booked_tracks.filter(item => !item.includes(track));
    const filteredtracks = user.tracks.filter(item => !item.includes(track));

    // update the user's booked array in the database
    await UserModel.updateOne({ user: user.user }, { booked_tracks: filteredBooked, tracks: filteredtracks });
  }
  res.send("deleted")
})
mongoose.connect(process.env.MONGO_URL).then(()=>{console.log("success")})
app.listen(3000)
