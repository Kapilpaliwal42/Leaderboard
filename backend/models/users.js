import mongoose from "mongoose";
const userschema = new mongoose.Schema({
    imgURL: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        required: true
    }

})
const User = mongoose.model("User", userschema);
export default User;