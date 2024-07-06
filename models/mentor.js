import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
    mentorName:{
        type:String,
        required:true
    },
    mentorMail:{
        type:String,
        required:true
    }
},{versionKey:false});


const mentor = mongoose.model("mentor",mentorSchema);
export {mentor};