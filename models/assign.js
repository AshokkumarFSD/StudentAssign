import mongoose from "mongoose";
const assignSchema = new mongoose.Schema({
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "student",
            required: true
        }
    ],
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "mentor",
        required: true
    }
},{versionKey:false})


const assign = mongoose.model("assign",assignSchema);
export {assign};