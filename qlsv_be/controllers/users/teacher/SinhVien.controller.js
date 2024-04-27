const SinhVienModel = require('../../../models/student.model');

module.exports.dashboard = async (req, res) => {
    try {
        const SinhVien = await SinhVienModel.find();
        console.log(SinhVien);
        res.json(SinhVien); // send response to client
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error'); // send error response to client
    }
};