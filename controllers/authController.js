import User from "../models/User.js"; // This works now with 'default' export
import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/response.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendResponse(res, 400, false, "User already exists");
    }

    // Create a new user
    const user = new User({ name, email, password, role });
    await user.save();

    sendResponse(res, 201, true, "User registered successfully", {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    sendResponse(
      res,
      500,
      false,
      "Error registering user",
      {},
      {},
      error.message
    );
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse(res, 400, false, "Invalid email or password");
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendResponse(res, 400, false, "Invalid email or password");
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    // Send the token as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevents JavaScript access to the cookie
      secure: process.env.NODE_ENV === "production", // Only use the secure flag in production
      maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
      sameSite: "Strict", // Helps prevent CSRF attacks
    });
    sendResponse(res, 200, true, "Login successful", {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    sendResponse(res, 500, false, "Error logging in", {}, {}, error.message);
  }
};
export const logoutUser = (req, res) => {
  try {
    // Clear the token cookie by setting it to an expired date
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    // Send a response back to the client
    sendResponse(res, 200, true, "User logged out successfully.");
  } catch (error) {
    sendResponse(res, 500, false, "Error logging out", {}, {}, error.message);
  }
};
export const refreshToken = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return sendResponse(res, 400, false, "Token is required");
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return sendResponse(res, 401, false, "Invalid or expired token");
      }

      // Generate a new token
      const newToken = jwt.sign(
        { id: decoded.id, role: decoded.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      sendResponse(res, 200, true, "Token refreshed successfully", {
        token: newToken,
      });
    });
  } catch (error) {
    sendResponse(
      res,
      500,
      false,
      "Error refreshing token",
      {},
      {},
      error.message
    );
  }
};
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Hash the provided token and find user
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return sendResponse(res, 400, false, "Invalid or expired token");
    }

    // Update the user's password
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendResponse(res, 200, true, "Password updated successfully");
  } catch (error) {
    sendResponse(
      res,
      500,
      false,
      "Error resetting password",
      {},
      {},
      error.message
    );
  }
};

export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse(res, 404, false, "User not found");
    }

    // Generate token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // Token valid for 15 minutes
    await user.save();

    // Send email (use a mail service like nodemailer here)
    console.log(`Reset token: ${resetToken}`); // Replace with email logic

    sendResponse(res, 200, true, "Password reset link sent");
  } catch (error) {
    sendResponse(
      res,
      500,
      false,
      "Error requesting password reset",
      {},
      {},
      error.message
    );
  }
};
