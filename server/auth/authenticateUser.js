import jwt from "jsonwebtoken";
import "dotenv/config";

const authenticateUser = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) return res.status(401).send("User need to be authenticate");

  try {
    const verifyToken = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = verifyToken;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send("Invalid Token");
  }
};

export default authenticateUser;
