const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    phone: String,
    access: String,
});

const Faculty = mongoose.model('Faculty', facultySchema);

module.exports = Faculty;
