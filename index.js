import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./db.js";
import { studentRouter } from "./routes/student.js";
import { mentorRouter } from "./routes/mentor.js";
import { assignRouter } from "./routes/assign.js";

//init express
const app = express();

//to accept the json
app.use(express.json());

dotenv.config();

dbConnection(process.env.MONGO_URL);

app.listen(process.env.PORT,()=>{
    console.log("Server listening at port: ",process.env.PORT);
})

app.use("/api/student",studentRouter);
app.use("/api/mentor",mentorRouter);
app.use("/api/assign",assignRouter);