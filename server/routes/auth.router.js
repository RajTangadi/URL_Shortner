import { Router } from "express";
import {
  // google,
  login,
  register,
  logout,
  deleteUser,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyUser.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
// router.post("/google", google);
router.get("/logout", logout);
// router.post("/update/:id", verifyToken, uploadMiddleware, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
