import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    studentName:{
        type:String,
        required:true
    },
    studentMail:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    batch:{
        type:String,
        required:true
    },
    mentorHistory: [{
        mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'mentor' },
        assignedDate: { type: Date, default: Date.now }
    }],
},{versionKey:false})

const student = mongoose.model("student",studentSchema);
export {student};