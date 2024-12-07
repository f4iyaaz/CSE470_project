const { signup, login } = require("../controllers/auth.controller.js");
const {
  signupValidation,
  loginValidation,
} = require("../middlewares/authValidation.js");

const router = require("express").Router();

router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signup);

module.exports = router;
