import express from 'express';
import { addNewStudent, getAllStudents } from '../controllers/student.js';

const router = express.Router();

// 2. Write API to create Student
router.post("/newStudent", async (req, res) => {
    try {
        const newStudent = await addNewStudent(req);
        if (newStudent) {
            return res.status(200).json({
                data: newStudent.data,
                message: newStudent.message
            })
        }
        return res.status(404).json({
            data: "Add failed"
        });
    } catch (error) {
        res.status(500).json({
            error:`Internal server error: ${error}`
        })
    }
});

router.get("/getAllStudents", async (req, res) => {
    try {
        const allStudents = await getAllStudents();
        if (allStudents.length > 0) {
            return res.status(200).json({
                data: allStudents
            })
        }
        return res.status(404).json({
            data: "No data found"
        })

    } catch (error) {
        res.status(500).json({
            error: `Internal server error : ${error}`
        })
    }
});


export const studentRouter = router;