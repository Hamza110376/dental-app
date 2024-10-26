const generateToken = require("../utils/generateToken");

const signIn = async (req, res) => {
  const { key } = req.body;

  if (key === process.env.ROOT_USER_KEY) {
    const token = generateToken({ rootUserId: process.env.ROOT_USER_ID });
    res.json({ success: true, data: { token } });
  }
};

module.exports = signIn;
