import express from "express";
import {
  registerUser,
  loginUser,
  requestPasswordReset,
  resetPassword,
  refreshToken,
  logoutUser,
} from "../controllers/authController.js"; // ES module import
import {
  loginValidation,
  registerValidation,
} from "../validators/authValidators.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerValidation, validateRequest, registerUser);
router.post("/login", loginValidation, validateRequest, loginUser);
// Logout route
router.post("/logout", authenticate, logoutUser);
router.post("/request-reset", requestPasswordReset);
router.post("/reset-password", resetPassword);
router.post("/refresh-token", refreshToken);

export default router; // Use default export
