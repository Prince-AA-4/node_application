import jwt from "jsonwebtoken";

export const authenticateRequest = (req, res, next) => {
  const token = req.cookies?.jwt || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: " No token was provided " });
  }
  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next()
  } catch (error) {
    return res.status(500).json({
      message: "Invalid token or token has expired",
    });
  }
};
