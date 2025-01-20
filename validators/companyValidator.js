import { body } from "express-validator";

// Social Links Validation
const validateSocialLinks = [
  body("socialLinks.facebook")
    .optional()
    .isURL()
    .withMessage("Facebook must be a valid URL."),
  body("socialLinks.twitter")
    .optional()
    .isURL()
    .withMessage("Twitter must be a valid URL."),
  body("socialLinks.linkedin")
    .optional()
    .isURL()
    .withMessage("LinkedIn must be a valid URL."),
  body("socialLinks.instagram")
    .optional()
    .isURL()
    .withMessage("Instagram must be a valid URL."),
];

// Main Company Profile Validation
export const validateCompany = [
  // Logo and Cover
  body("logo").optional().isString().withMessage("Logo must be a string."),
  body("cover").optional().isString().withMessage("Cover must be a string."),

  // Basic Information
  body("companyName")
    .notEmpty()
    .withMessage("Company name is required.")
    .isString()
    .withMessage("Company name must be a string."),
  body("email")
    .notEmpty()
    .withMessage("Email address is required.")
    .isEmail()
    .withMessage("Email must be a valid email address."),
  body("phone")
    .notEmpty()
    .withMessage("Phone number is required.")
    .isString()
    .withMessage("Phone number must be a string."),
  body("website")
    .optional()
    .isURL()
    .withMessage("Website must be a valid URL."),

  // Other Fields
  body("estSince")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Est. Since must be a valid date."),
  body("teamSize")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Team size must be a positive integer."),
  body("city")
    .notEmpty()
    .withMessage("City is required.")
    .isString()
    .withMessage("City must be a string."),
  body("country")
    .notEmpty()
    .withMessage("Country is required.")
    .isString()
    .withMessage("Country must be a string."),
  body("industryType")
    .notEmpty()
    .withMessage("Industry type is required.")
    .isString()
    .withMessage("Industry type must be a string."),
  body("allowInSearch")
    .optional()
    .isBoolean()
    .withMessage("Allow in search must be a boolean value."),
  body("aboutCompany")
    .optional()
    .isString()
    .withMessage("About company must be a string."),

  // Social Links Validation
  ...validateSocialLinks,
];
