import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    console.log("Cookies:", req.cookies);
    const token = req.cookies?.token;

    if (!token || typeof token !== "string") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Valid token not found",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded token", decoded)
    req.user = decoded.userId;
    console.log(req.user)
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
