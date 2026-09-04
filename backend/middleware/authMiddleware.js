import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;

    // Token nahi mila
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login first.",
      });
    }

    // Token verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("user infor", decode)
    // User information request me store
    req.user = decoded;

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
