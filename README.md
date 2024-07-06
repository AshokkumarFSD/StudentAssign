

TASK:
1. Write API to create Mentor
https://studentassign-s76w.onrender.com/api/mentor/newMentor
{
    "mentorMail":"sanjay@gmail.com",
    "mentorName":"sanjay"
}


2. Write API to create Student
https://studentassign-s76w.onrender.com/api/student/newStudent
Sample input
{
    "studentMail":"manoj@gmail.com",
    "studentName":"manoj",
    "course":"MERN stack",
    "batch":"B002"
}


3. Write API to Assign a student to Mentor
Select one mentor and Add multiple Student
A student who has a mentor should not be shown in List

https://studentassign-s76w.onrender.com/api/assign/studentsAssign
{
    "students":[
        "66893392495e60cf06f43dbe",
        "6689339f495e60cf06f43dc4"
    ],
    "mentor":"668933ce495e60cf06f43dd4"
}


4. Write API to Assign or Change Mentor for particular Student
Select One Student and Assign one Mentor
https://studentassign-s76w.onrender.com/api/assign/changeMentor
{
    "mentorId":"668933c8495e60cf06f43dd1",
    "studentId":"6689339f495e60cf06f43dc4"
}

5. Write API to show all students for a particular mentor
https://studentassign-s76w.onrender.com/api/assign/668933ce495e60cf06f43dd4/mentorstudents

6. Write an API to show the previously assigned mentor for a particular student.
https://studentassign-s76w.onrender.com/api/assign/student/6689339f495e60cf06f43dc4/mentors
