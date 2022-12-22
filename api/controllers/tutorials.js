const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const TutorialSchema = require("../models/tutorialsModel");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.GET_USER_TUTORIALS = function (req, res) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).end();
  }
  const tokenId = jwt.verify(token, process.env.JWT_SECRET);
  req.body.id = tokenId.userId;
  TutorialSchema.find({ userId: req.body.id }).then((results) => {
    return res.status(200).json({ tutorials: results });
  });
};

module.exports.GET_TUTORIALS = function (req, res) {
  TutorialSchema.find().then((results) => {
    return res.status(200).json({ tutorials: results });
  });
};

module.exports.CREATE_TUTORIAL = function (req, res) {
  const tutorial = new TutorialSchema({
    tutorial: req.body.tutorial,
    isDone: req.body.isDone,
    userId: req.body.userId,
    title: req.body.title,
    content: [],
    private: true,
  });

  tutorial.save().then((result) => {
    console.log(result._id);

    TutorialSchema.updateOne({ _id: result._id }, { id: result._id }).exec();

    return res.status(200).json({
      statusMessage: "tutorial was created successfully",
      result: result,
    });
  });
};
