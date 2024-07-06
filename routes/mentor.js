import express from 'express';
import { addNewMentor,getAllMentors } from '../controllers/mentor.js';

const router = express.Router();

router.post("/newMentor", async (req, res) => {
    try {
        const newMentor = await addNewMentor(req);
        if (newMentor) {
            return res.status(200).json({
                data: newMentor.data,
                message: newMentor.message
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

router.get("/getAllMentors", async (req, res) => {
    try {
        const allMentors = await getAllMentors();
        if (allMentors.length > 0) {
            return res.status(200).json({
                data: allMentors
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


export const mentorRouter = router;