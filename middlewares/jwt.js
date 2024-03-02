
//convert to require
const {getUserDetails} = require("../models/user");
const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    if(!token) return res.status(403).json({
      message: "Token not provided",
    })
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      if (typeof data === 'string') throw Error('Invalid token provided')
      const user = await getUserDetails(data.id);
      if (!user) throw Error('User not found')
      res.user = user
    } catch (error) {
      return res.status(403).json({
        message: "Invalid token provided",
      });
    }
    next();
  } else {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }
}