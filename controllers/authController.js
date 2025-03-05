import User from "../models/User.js"; // This works now with 'default' export
import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/response.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { JWT_SECRET, NODE_ENV } from "../config/index.js";
import Company from "../models/Company.js";
import Candidate from "../models/Candidate.js";

const accessTokenExpireIn = "1d";
const refreshTokenExpireIn = "15d";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendResponse(res, 400, false, "User already exists");
    }

    // Capitalize the first letter of the role
    const capitalizedRole =
      role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();

    // Create a new user
    const user = new User({ name, email, password, role: capitalizedRole });
    await user.save();

    // Create corresponding profiles based on the role
    let profileData;
    if (capitalizedRole === "Company") {
      profileData = await Company.create({ userId: user._id, email });
    } else if (capitalizedRole === "Candidate") {
      profileData = await Candidate.create({ userId: user._id, email });
    }

    // Link the profile to the user
    user.profile = profileData._id;
    await user.save();

    // JWT Payload
    const tokenPayload = {
      id: user._id,
      role: user.role,
      profileId: user.profile,
    };

    // Generate access and refresh tokens
    const accessToken = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: accessTokenExpireIn,
    });
    const refreshToken = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: refreshTokenExpireIn,
    });

    // Store the refresh token in a secure HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 15 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send response including the JWT token
    sendResponse(res, 201, true, "User registered successfully", {
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileId: user.profile,
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

    // Validate input
    if (!email || !password) {
      return sendResponse(res, 400, false, "Email and password are required");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return sendResponse(res, 400, false, "Invalid email format");
    }
    // Find the user by email
    const user = await User.findOne({ email }).populate("profile");
    if (!user) {
      return sendResponse(res, 400, false, "This user is not registered");
    }

    // Validate the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendResponse(res, 400, false, "Invalid email or password");
    }
    // JWT Payload
    const tokenPayload = {
      id: user._id,
      role: user.role,
      profileId: user.profile?._id,
    };
    // Generate access and refresh tokens
    const accessToken = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: accessTokenExpireIn,
    });
    const refreshToken = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: refreshTokenExpireIn,
    });

    // Store the refresh token in a secure HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 15 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send the response
    sendResponse(res, 200, true, "Login successful", {
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileId: user.profile?._id,
      },
    });
  } catch (error) {
    console.error(error);
    sendResponse(
      res,
      500,
      false,
      "Error logging in",
      { error },
      {},
      error.message
    );
  }
};

export const logoutUser = (req, res) => {
  try {
    // Clear the token cookie by setting it to an expired date
    res.clearCookie("token", {
      httpOnly: true,
      secure: NODE_ENV === "production",
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
    console.log(req.cookie);
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return sendResponse(res, 400, false, "Refresh token is required");
    }

    // Verify the refresh token
    jwt.verify(refreshToken, JWT_SECRET, (err, decoded) => {
      if (err) {
        return sendResponse(
          res,
          401,
          false,
          "Invalid or expired refresh token"
        );
      }

      // Generate a new access token
      const newAccessToken = jwt.sign(
        {
          id: decoded.id,
          role: decoded.role,
          profileId: decoded.profileId,
        },
        JWT_SECRET,
        { expiresIn: accessTokenExpireIn }
      );

      sendResponse(res, 200, true, "Access token refreshed successfully", {
        accessToken: newAccessToken,
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
