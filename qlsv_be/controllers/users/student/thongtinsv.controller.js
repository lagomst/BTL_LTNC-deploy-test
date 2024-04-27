const thongSinhVien = require('../../../models/student.model');

module.exports.dashboard = async (req, res) => {
  const {mssv} = req.user; 
  try {
        const thongtinsinhvien = await thongSinhVien.find({
          "mssv": mssv
        });
        res.json(thongtinsinhvien); // send response to client
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error'); // send error response to client
    }
};

// exports.viewOneStudentInfo = async (req, res) => {
//     const {mssv} = req.params
//     try {
//         const stu_find = {"mssv": mssv};
//         const stuRet = await student.findOne(stu_find);
//         if (!stuRet) {
//           return res.status(404).send();
//         }
//         res.send(stuRet);
//       } catch (e) {
//         res.status(400).send(e);
//       }
// };