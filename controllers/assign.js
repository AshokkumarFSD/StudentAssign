import { assign } from "../models/assign.js";
import { mentor } from "../models/mentor.js";
import { student } from "../models/student.js";

export function getAssignedDetailsOfMentor(mentorId){
    return assign.find({mentor:mentorId});
}

export function getAssignedDetail(){
    return assign.find();
}

export async function assignStudentsToMentor(req){
    const studentIds = req.body.students;
    const mentorId = req.body.mentor;
    console.log(mentorId);
     try {
        // Find or create the assign document for the given mentor ID
        let assignDoc = await assign.findOne({ mentor: mentorId });
        if (!assignDoc) {
            assignDoc = new assign({
                mentor: mentorId,
                students: []
            });
        }

        let newStudentsAdded = false;
        for (const studentId of studentIds) {
            // Check if the student is already assigned to a mentor
            const existingAssign = await assign.findOne({ students: studentId });
            if (!existingAssign && !assignDoc.students.includes(studentId)) {
                assignDoc.students.push(studentId);
                newStudentsAdded = true;
            }
        }

        if (newStudentsAdded) {
            await assignDoc.save();
            return {status: true,data: assignDoc,  message: 'New students added successfully.' };
        } else {
            return {status: false, data: [], message: 'All students are already assigned to this mentor.' };
        }
    } catch (error) {
        console.error(error);
        return {status: false, data:[], message: `An error occurred: ${error}`  };
    }
}

export async function changeStudentMentor(studentId, newMentorId) {
    try {
        const studentDetails = await student.findById(studentId).populate('mentorHistory.mentor');
        if (!studentDetails) {
            return {status: false, data:[], message: 'Student not found.' };
        }

        const newMentor = await mentor.findById(newMentorId);
        if (!newMentor) {
            return {status: false, data:[], message: 'New mentor not found.' };
        }

        // Get current mentor from Assign document
        const currentAssign = await assign.findOne({ students: studentId });
        if (currentAssign) {
            // Update the student's mentor history

            const mentorHistory = studentDetails.mentorHistory;
            if(mentorHistory.length>0){
                const lastMentor = mentorHistory[mentorHistory.length-1];
                if(lastMentor.mentor._id.toString() !== newMentorId)
                {
                    studentDetails.mentorHistory.push({
                        mentor: currentAssign.mentor,
                        assignedDate: Date.now()
                    });
                }
                else{
                    console.log("last mentor is same, no need to update")
                }
            }
            else{
                studentDetails.mentorHistory.push({
                    mentor: currentAssign.mentor,
                    assignedDate: Date.now()
                });
            }

            // Remove the student from the current mentor's assign document
            currentAssign.students = currentAssign.students.filter(sid => sid.toString() !== studentId);
            await currentAssign.save();
        }

        // Assign the student to the new mentor
        let newAssign = await assign.findOne({ mentor: newMentorId });
        if (!newAssign) {
            newAssign = new assign({
                mentor: newMentorId,
                students: [studentId]
            });
        } else {
            newAssign.students.push(studentId);
        }

        await newAssign.save();
        await studentDetails.save();

        return {status: true, data:[],  message:'Student mentor changed successfully.'};
    } catch (error) {
        console.error(error);
        return {status: false, data:[], message: `An error occurred while changing the mentor.: ${error}`  };
    }
}

export async function previousMentors(studentId) {
   return await student.findById(studentId).populate('mentorHistory.mentor');
}

export async function allStudentsOfMentor(mentorId)
{
    return await assign.findOne({ mentor: mentorId }).populate('students','-mentorHistory').populate('mentor');
}