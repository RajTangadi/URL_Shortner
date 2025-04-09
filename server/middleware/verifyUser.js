import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js"; // Ensure this is correctly imported

export const verifyToken = (req, res, next) => {
  // const token = req.cookies.access_token;
  // Try to get token from Authorization header first
  const authHeader = req.headers.authorization;
  const headerToken = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"

  // Try to get token from cookies
  const cookieToken = req.cookies.access_token;

  // Use whichever token exists
  const token = headerToken || cookieToken;

  

  if (!token) {
    return next(errorHandler(401, "You are not authenticated!")); // Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(403, "Token is not valid!")); // Forbidden
    }
    // console.log("Authenticated user:", user);
    req.user = user;
    next();
  });
};
