const mongoose = require('mongoose');
const couSem = require('./courseInSemester.model.js').Schema

const teacherSchema = new mongoose.Schema({
    name: String, 
    email: String,
    password: {
        type: String,
        default: '123456'
    },
    msgv: {
        type: String,
        require: true,
        unique: true
    },
    role: {
        type: String,
        default: 'teacher'
    },
    image: { type: String, required: false },
    private_info: {
        birthday: Date,
        gender: { type: String, enum: ['M', 'F'] },
        degree: String,
        cccd: String,
        cccdDay: Date,
        cccdLocation: String,
        faculty: String,
        address: String,
        phoneNumber: String,
        email: String,
        personalEmail: String,
    }
});

const teacherModel = mongoose.model('teacher', teacherSchema);
module.exports = teacherModel;