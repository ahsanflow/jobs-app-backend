import { body } from "express-validator";

export const registerValidation = [
  body("email").isEmail().withMessage("A valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["admin", "candidate", "employer"])
    .withMessage("Invalid or no role specified"),
];

export const loginValidation = [
  body("email").isEmail().withMessage("A valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const companyProfileValidationRules = [
  body("companyName")
    .notEmpty()
    .withMessage("Company name is required")
    .trim()
    .escape(),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone()
    .withMessage("Invalid phone number format"),
  body("website").optional().isURL().withMessage("Invalid website URL"),
  body("teamSize")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Team size must be a positive integer"),
  body("categories.*").optional().trim().escape(),
  body("address.country")
    .notEmpty()
    .withMessage("Country is required")
    .trim()
    .escape(),
  body("address.city")
    .notEmpty()
    .withMessage("City is required")
    .trim()
    .escape(),
  body("address.fullAddress")
    .notEmpty()
    .withMessage("Full address is required")
    .trim()
    .escape(),
  body("address.latitude")
    .optional()
    .isFloat()
    .withMessage("Invalid latitude value"),
  body("address.longitude")
    .optional()
    .isFloat()
    .withMessage("Invalid longitude value"),
  body("socialLinks.facebook")
    .optional()
    .isURL()
    .withMessage("Invalid Facebook URL"),
  body("socialLinks.twitter")
    .optional()
    .isURL()
    .withMessage("Invalid Twitter URL"),
  body("socialLinks.linkedin")
    .optional()
    .isURL()
    .withMessage("Invalid LinkedIn URL"),
  body("socialLinks.googlePlus")
    .optional()
    .isURL()
    .withMessage("Invalid Google Plus URL"),
];
