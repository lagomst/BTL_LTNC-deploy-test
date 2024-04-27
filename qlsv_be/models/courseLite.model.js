///////
//Note: this model is for testing only
///////
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    semester: { type: String, required: true },
    courseCode: { type: String, required: true},
    name: {type: String, required: true},
    credit: {type: String, required: true},
    teacherCode: {type: String, ref: 'teacher', required: true },
});

const courseModel = mongoose.model('course', courseSchema);
module.exports = courseModel;