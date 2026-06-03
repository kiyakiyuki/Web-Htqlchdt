const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000; // Bạn có thể hẹn với nhóm bạn dùng cổng 3000 này cho giao diện chính

// Cấu hình đọc file tĩnh ngay trong chính thư mục TrangChu này
app.use(express.static(__dirname));

// Route mặc định mở trang chủ của bạn
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'TrangChu.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Giao diện của bạn đang chạy tại: http://localhost:${PORT}`);
});