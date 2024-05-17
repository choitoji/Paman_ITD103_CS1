const Student = require('../models/studentModel');

// Create a new student
exports.createStudent = async (req, res) => {
    try {
        const newStudent = await Student.create(req.body);
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single student by ID
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a student by ID
exports.updateStudent = async (req, res) => {
    console.log("Received update data:", req.body); // Add this to log incoming data
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a student by ID
exports.deleteStudent = async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json({ student });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStudentsByYearLevel = async (req, res) => {
    try {
        const students = await Student.aggregate([
            { $group: { _id: { yearLevel: "$yearLevel", schoolYear: "$schoolYear" }, count: { $sum: 1 } } }
        ]);
        return res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStudentGenderCount = async (req, res) => {
    try {
        const genderCounts = await Student.aggregate([
            {
                $group: {
                    _id: { $toLower: "$sex" }, // Convert to lowercase for consistency
                    count: { $sum: 1 }
                }
            }
        ]);

        // Format the gender count data
        const formattedCounts = genderCounts.reduce((acc, curr) => {
            switch (curr._id) {
                case 'male':
                    acc.male = curr.count;
                    break;
                case 'female':
                    acc.female = curr.count;
                    break;
                case 'prefer not to say':
                    acc.preferNotToSay = curr.count; // Match lowercase casing
                    break;
                default:
                    break;
            }
            return acc;
        }, { male: 0, female: 0, preferNotToSay: 0 });

        return res.status(200).json(formattedCounts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

