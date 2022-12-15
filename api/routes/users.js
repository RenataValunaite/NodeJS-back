const express = require("express");
const router = express.Router();

const {
  REGISTER_USER,
  GET_USER,
  GET_ALL_USERS,
  USER_LOGIN,
} = require("../controllers/users");

router.post("/registerUser", REGISTER_USER);

router.get("/getUser/:id", GET_USER);

router.get("/getAllUsers", GET_ALL_USERS);

router.post("/login", USER_LOGIN);

module.exports = router;
