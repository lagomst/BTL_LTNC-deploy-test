module.exports.dashboard = (req, res) => {
    try {
        // Thực hiện các thao tác thành công ở đây
        res.send("Xin chào! Đây là dòng tin nhắn thành công của tôi.");
    } catch (error) {
        // Xử lý lỗi khi có lỗi xảy ra
        res.send("Xin lỗi! Đây là dòng tin nhắn thất bại của tôi.");
    }
};

