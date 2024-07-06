import { mentor } from "../models/mentor.js";

export function getAllMentors(){
    return mentor.find();
}

export async function addNewMentor(req){
    const mentorMail = req.body.mentorMail;
    const mentorDetails = await mentor.find({ mentorMail: mentorMail })
    if (!mentorDetails.length) {
        const insertedData = await new mentor({
            ...req.body,
        }).save();
        return { status: true, data: insertedData, message: "Added successfully" };
    }
    else {
        return { status: false, data: [], message: "Mentor already exist with same email" };
    }
}