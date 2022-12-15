const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

const {
  GET_USER_TUTORIALS,
  GET_TUTORIALS,
  CREATE_TUTORIAL,
} = require("../controllers/tutorials");

router.get("/getUserTutorials/:id", auth, GET_USER_TUTORIALS);

router.get("/getTutorials", GET_TUTORIALS);

router.post("/createTutorial", CREATE_TUTORIAL);

module.exports = router;
