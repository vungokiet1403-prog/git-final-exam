const bcrypt = require("bcryptjs");
const db = require("./config/db");

async function updatePassword() {
  const hash = await bcrypt.hash("123456", 10);

  db.query(
    "UPDATE admins SET password=? WHERE username=?",
    [hash, "admin"],
    (err) => {
      if (err) console.log(err);
      else console.log("✅ Đã cập nhật password mới!");
      process.exit();
    }
  );
}

updatePassword();