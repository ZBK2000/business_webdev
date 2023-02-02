import mongoose from "mongoose"

const Schema = mongoose.Schema;
//const ObjectId = Schema.Types.ObjectId;

const UserSchema  = new Schema({
  user: String,
  password: String,
  tracks: Array,
  booked_tracks: Array
 
});

const UserModel = mongoose.model("user", UserSchema)

export default UserModel