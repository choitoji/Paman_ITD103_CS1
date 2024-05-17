const express = require('express');

const {
    createUser,
    getUser,
    loginUser
} = require('../controllers/userController');

const {
    createStudent,
    getStudent,
    updateStudent,
    getAllStudents,
    getStudentsByYearLevel,
    deleteStudent,
    getStudentGenderCount
} = require('../controllers/studentController');

const router = express.Router();

// User routes
router.post('/users', createUser);
router.get('/users/:id', getUser);
router.post('/login', loginUser);

// Student routes
router.post('/createStudent', createStudent);
router.get('/students/:id', getStudent);
router.get('/getAllstudents', getAllStudents);
router.get('/studentNumber', getStudentsByYearLevel);
router.get('/studentGenderCount', getStudentGenderCount);
router.put('/updateStudent/:id', updateStudent);
router.delete('/deleteStudent/:id', deleteStudent);


module.exports = router;
