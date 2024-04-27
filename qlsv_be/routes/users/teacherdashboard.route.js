const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const thongtinGiangVien = require('../../controllers/users/teacher/thongtingv.controller');
const bangdieukhien = require('../../controllers/users/teacher/bangdieukhien.controller');
const khoahoc = require('../../controllers/users/teacher/KhoaHoc.controller');
const SinhVien = require('../../controllers/users/teacher/SinhVien.controller');
router.use('/thongtingiangvien',thongtinGiangVien.dashboard);


router.get('/bangdieukhien', bangdieukhien.dashboard);
router.get('/bangdieukhien/:courseCode', bangdieukhien.viewStudentEnrollCourse);
router.put('/bangdieukhien/updateGrade', bangdieukhien.updateGradeforStudent)

//router.use('/khoahoc',khoahoc.dashboard);
router.use('/SinhVien',SinhVien.dashboard);

// Set up storage for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'lesson_uploads/') // Store lesson files in 'lesson_uploads' folder
  },
  filename: function(req, file, cb) {
    // Append the upload date and the original file extension to the original name
    cb(null, file.originalname.split('.')[0] + '-' + Date.now() + path.extname(file.originalname))
  }
});

// Create the upload middleware
const upload = multer({ storage: storage });

router.post('/bangdieukhien/khoahoc/:courseCode', upload.single('lessonFile'), khoahoc.updateLesson);
router.post('/thongtingiangvien/changePic', upload.single('image'), thongtinGiangVien.updatePicture);

module.exports = router;