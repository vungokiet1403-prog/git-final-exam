const db = require("../config/db");
const bcrypt = require("bcryptjs");

exports.createStaff = async (req, res) => {
    const { username, password, full_name } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    db.query(
        "INSERT INTO admins (username, password, full_name, role) VALUES (?, ?, ?, 'staff')",
        [username, hashed, full_name],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Tạo nhân viên thành công" });
        }
    );
};

exports.getAllStaff = (req, res) => {
    db.query("SELECT id, username, full_name FROM admins WHERE role='staff'",
        (err, result) => {
            res.json(result);
        }
    );
};

exports.deleteStaff = (req, res) => {
    db.query("DELETE FROM admins WHERE id=?", [req.params.id],
        () => res.json({ message: "Đã xoá" })
    );
};

// Quản lí khách 
exports.getUsers = (req, res) => {
    db.query(
        "SELECT id, full_name, email FROM customers",
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }
            res.json(result);
        }
    );
};

exports.foodOrders = (req,res)=>{
const sql = `
SELECT 
bp.id,
bp.room_number,
p.name,
bp.quantity,
bp.created_at
FROM booking_products bp
JOIN products p ON bp.product_id = p.id
ORDER BY bp.created_at DESC
`;

db.query(sql,(err,result)=>{

if(err){
console.log(err);
return res.status(500).json({error:"DB error"});
}

res.json(result);

});

};
exports.deleteUser = (req, res) => {
    db.query(
        "DELETE FROM customers WHERE id=?",
        [req.params.id],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Đã xoá khách" });
        }
    );
};