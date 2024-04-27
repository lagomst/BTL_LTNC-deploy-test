const express = require('express');

const router = express.Router();

const teacherController = require('../../controllers/admin/teacher.controller');

router.get('/', teacherController.getAllTeachers);
router.post('/add', teacherController.addTeacher);
router.put('/update', teacherController.updateTeacher);
router.delete('/delete', teacherController.deleteTeacher);

module.exports = router;