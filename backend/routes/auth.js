var express = require("express");
var router = express.Router();
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");
const { check } = require("express-validator");

// SIGN UP
router.post(
  "/signup",
  [
    check("name").isLength({ min: 3 }).withMessage("Name too short..."),
    check("email").isEmail().withMessage("Invalid Email..."),
    check("password").isLength({ min: 3 }).withMessage("Password too short..."),
  ],
  signup
);

// SIGN IN
router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("Email field required..."),
    check("password")
      .isLength({ min: 3 })
      .withMessage("Password field required..."),
  ],
  signin
);

// SIGN OUT
router.get("/signout", signout);

module.exports = router;
