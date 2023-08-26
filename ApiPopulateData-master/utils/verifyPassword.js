const bcrypt = require("bcrypt");

async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

module.exports = verifyPassword;