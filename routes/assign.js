import express from 'express';
import {allStudentsOfMentor, assignStudentsToMentor,changeStudentMentor, getAssignedDetail, previousMentors } from '../controllers/assign.js';

const router = express.Router();

// 3. Write API to Assign a student to Mentor
// Select one mentor and Add multiple Student
// A student who has a mentor should not be shown in List
router.post("/studentsAssign", async (req, res) => {
    try {
        const assignResult = await assignStudentsToMentor(req);
        if (assignResult) {
            return res.status(200).json({
                data: assignResult.data,
                message: assignResult.message
            })
        }
        return res.status(404).json({
            data: "Assign failed"
        });
    } catch (error) {
        res.status(500).json({
            error:`Internal server error: ${error}`
        })
    }
});

router.get("/getAllAssign", async (req, res) => {
    try {
        const assignResult = await getAssignedDetail();
        if (assignResult) {
            return res.status(200).json({
                data: assignResult,
            })
        }
        return res.status(404).json({
            data: "Assign failed"
        });
    } catch (error) {
        res.status(500).json({
            error:`Internal server error: ${error}`
        })
    }
});

// 4. Write API to Assign or Change Mentor for particular Student
// Select One Student and Assign one Mentor
router.post("/changeMentor", async (req, res) => {
    try {
        const assignResult = await changeStudentMentor(req.body.studentId,req.body.mentorId);
        if (assignResult) {
            return res.status(200).json({
                data: assignResult.data,
                message: assignResult.message
            })
        }
        return res.status(404).json({
            data: "Assign failed"
        });
    } catch (error) {
        res.status(500).json({
            error:`Internal server error: ${error}`
        })
    }
});

// 6. Write an API to show the previously assigned mentor for a particular student.
router.get('/student/:studentId/mentors', async (req, res) => {
    const studentId = req.params.studentId;
    try {
        const assignResult = await previousMentors(studentId);
        if (assignResult) {
            return res.status(200).json({
                data:assignResult,
            })
        }
        return res.status(404).json({
            data: "No data found"
        });
    } catch (error) {
        res.status(500).json({
            error:`Internal server error: ${error}`
        })
    }
});

// 5. Write API to show all students for a particular mentor
router.get('/:mentorId/mentorstudents', async (req, res) => {
    const mentorId = req.params.mentorId;
    try {
        const result = await allStudentsOfMentor(mentorId);
        if (result) {
            return res.status(200).json({
                data:result,
            })
        }
        return res.status(404).json({
            data: "No data found"
        });
    } catch (error) {
        res.status(500).json({
            error:`Internal server error: ${error}`
        })
    }
});



export const assignRouter = router;