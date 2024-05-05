const mongoose = require('mongoose');
const couSem = require('./courseInSemester.model.js').Schema

const studentSchema = new mongoose.Schema(
{
    name: String,
    email: String,
    password: {
        type: String, 
        default: '123456',
    },
    mssv: { 
        type: String, 
        require: true, 
        unique: true
    },
    role: {
        type: String,
        default: 'student'
    },
    image: { type: String, required: false },
    passwordChanged: {
        type: Boolean,
        default: false,
    },
    private_info:{
        birthday: Date,
        gender: { type: String, enum: ['M', 'F'] },
        cccd: String,
        cccdDay: Date,
        cccdLocation: String,
        faculty: String,
        classId: { type: String, ref: 'Lop' },
        address: String,
        phoneNumber: String,
        email: String,
        personalEmail: String,
    },
      // Training information
    training_info:{
        yearOfAdmission: String,
        trainingTime: String,
        educationProgram: String,
        status: String,
        expectSemester: String,
        maximumSemester: String,
        AAC: String,
        GPA: String,
        major: String,
        expectGrationDate: String,
    },
    courseEnroll: {
        type: [couSem],
    },
    courseReg: {
        type: [couSem]
    }
}, 
    { 
        timestamps: true // Enable createdAt and updatedAt fields
    }
);

const studentModel = mongoose.model('student', studentSchema);
module.exports = studentModel;
