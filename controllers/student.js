import { student } from "../models/student.js"

export function getAllStudents(){
    return student.find();
}

export async function addNewStudent(req){
    const studentMail = req.body.studentMail;
    const studentDetails = await student.find({ studentMail: studentMail })
    if (!studentDetails.length) {
        const insertedData = await new student({
            ...req.body,
        }).save();
        return { status: true, data: insertedData, message: "Added successfully" };
    }
    else {
        return { status: false, data: [], message: "Student already exist with same email" };
    }
}