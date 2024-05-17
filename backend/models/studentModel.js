const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    id: Number,
    idNumber: Number,
    firstName: String,
    lastName: String,
    email: String,
    age: String,
    contactNumber: String,
    address: String,
    yearLevel: String,
    status: String,
    sex: String,
    schoolYear: String,
  });

 const Student = mongoose.model('Student', studentSchema);

module.exports = Student;