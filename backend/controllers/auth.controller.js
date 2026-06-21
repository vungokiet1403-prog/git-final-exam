const db = require("../config/db");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
    const { username, password } = req.body;

    db.query(
        "SELECT * FROM admins WHERE username = ?",
        [username],
        async (err, result) => {

            if (err) {
                return res.status(500).json({ message: "Lỗi server" });
            }

            if (result.length === 0) {
                return res.status(400).json({ message: "Tài khoản không tồn tại" });
            }

            const user = result[0];

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: "Sai mật khẩu" });
            }

            // LƯU SESSION
            req.session.admin = {
                id: user.id,
                role: user.role,
                username: user.username
            };

            return res.json({
                message: "Đăng nhập thành công",
                admin: req.session.admin
            });
        }
    );
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.json({ message: "Đăng xuất thành công" });
    });
};