const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/user.controller');
const upload = require('../middlewares/multer.middleware');
const verifyJWT = require('../middlewares/auth.middleware');

const router = express.Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1
    },
    {
      name: "coverImage",
      maxCount: 1
    }
  ]),
  registerUser
);

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT, logoutUser)

module.exports = router;
