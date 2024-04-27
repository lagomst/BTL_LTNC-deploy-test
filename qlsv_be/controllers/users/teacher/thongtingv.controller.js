const thongtinGiangVien = require('../../../models/teacher.model');
const multer = require('multer');
const path = require('path'); //Upload image

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/')  // Store files in the 'uploads' folder
    },
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-gv-' + Date.now() + path.extname(file.originalname))  // Create a unique file name
    }
});
const upload = multer({ storage: storage });

module.exports.dashboard = async (req, res) => {
    const {msgv} = req.user
    try {
        const thongtingiangvien = await thongtinGiangVien.findOne({"msgv": msgv})
        .select({"password": 0});
        //console.log(thongtingiangvien);
        res.json(thongtingiangvien); // send response to client
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error'); // send error response to client
    }
};

module.exports.updatePicture = async (req, res) => {
    const {msgv} = req.user
    try {
        const find_filter = {"msgv": msgv}
        const update_filter = {$set: {"image": req.body.image}}
        const thongtingiangvien = await thongtinGiangVien.updateOne(find_filter, update_filter);
        res.json(thongtingiangvien); // send response to client
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error'); // send error response to client
    }
};