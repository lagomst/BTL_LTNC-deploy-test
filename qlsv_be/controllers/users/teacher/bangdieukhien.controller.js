const mongoose = require('mongoose')
const student = require('../../../models/student.model')
const course = require('../../../models/course.model')


module.exports.dashboard = async (req, res) => {
  const {msgv} = req.user;
    try {
        const cou = await student.aggregate([
          {//Unwind elements in courseEnroll
            $unwind: "$courseEnroll"
          },
          {//Filter documents that has msgv 
            $match: {"courseEnroll.msgv": msgv} 
          },
          {//Group documents by courseCode
          //and count number of students studying in this course
            $group: {
              _id: '$courseEnroll.courseCode',
              semester: {$first: '$courseEnroll.semester'},
              credit: {$first: '$courseEnroll.credit'},
              studentCount: {$sum: 1}
            }
          },
          {//Left outer join with courses collection
          //and save result to array cou_info 
            $lookup: {
              from: 'courses',
              localField: "_id",
              foreignField: "courseCode",
              as: "cou_info",
            }
          },
          {//Unwind elements in cou_info
            $unwind: "$cou_info"
          },
          {//Get needed info
            $project: {
              "_id": 1,
              "semester": 1,
              "courseCode": 1,
              "credit": 1,
              "cou_info.scheduleDay": 1,
              "cou_info.scheduleTime": 1,
              "cou_info.classroom": 1
            }
          }
        ]);
        if (!cou) {
            return res.status(404).send("Cannot find courses with msgv = " + msgv);
          }
        res.send(cou)
    } catch (error) {
        // Xử lý lỗi khi có lỗi xảy ra
        res.send("Xin lỗi! Đây là dòng tin nhắn thất bại của bangdieukhien.");
    }
  };

//View all student studying a course
module.exports.viewStudentEnrollCourse = async (req, res) => {
    const {courseCode} = req.params;
    try {
      const find_filter = {"courseEnroll.courseCode": courseCode}
      const courseRet = await student.find(find_filter);
      if (!courseRet) {
        return res.status(404).send();
      }
      res.send(courseRet);
    } catch (e) {
      res.status(400).send(e);
    }
}

//Count students studying a course
module.exports.countStudentEnrollCourse = async (req, res) => {
    const {courseCode, semester} = req.params;
    try {
      const find_filter = {"courseEnroll.courseCode": courseCode, "courseEnroll.semseter": semester}
      const group_filter = {
        _id: "$courseEnroll.courseCode",
        studentCount: {$sum: 1}
      }
      const courseRet = await student.aggregate([
        {$match: find_filter},
        {$unwind: "$courseEnroll"},
        {$group: group_filter}
      ]);
      if (!courseRet) {
        return res.status(404).send();
      }
      res.send(courseRet);
    } catch (e) {
      res.status(400).send(e);
    }
}

//Update grade of a course for a student
exports.updateGradeforStudent = async (req, res) => {
    const {mssv, courseCode, lab, midterm, final} = req.body;
    try {
      const stu_find = {"mssv": mssv, "courseEnroll.courseCode": courseCode};
      const stu_update = 
      {
        $set: {
          "courseEnroll.$.grade": 
          {
            "lab": lab,
            "midterm": midterm,
            "final": final
          }
        }
      };
      const stu_option = {};
      const courseRet = await student.updateOne(stu_find, stu_update, stu_option);
      if (!courseRet) {
        return res.status(404).send();
      }
      res.send(courseRet);
    } catch (e) {
      res.status(400).send(e);
    }
  }