const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = require("../models/usersModel");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.REGISTER_USER = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = new UserSchema({
    email: req.body.email,
    password: hashedPassword,
    regTimeStamp: req.body.regTimeStamp,
    totalTutorialsDone: 0,
    tutorialIds: [],
  });

  user
    .save()
    .then((result) => {
      return res
        .status(200)
        .json({ response: "User was registered successfully", user: result });
    })
    .catch((err) => {
      console.log("err", err);
      res.status(500).json({ response: "Failed" });
    });
};

module.exports.USER_LOGIN = async (req, res) => {
  try {
    const user = await UserSchema.findOne({ email: req.body.email });

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    console.log(user);

    if (isPasswordMatch) {
      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
        { algorythm: "RS256" }
      );

      return res
        .status(200)
        .json({ status: "login successfull", jwt_token: token });
    }
    return res.status(401).json({ status: "login failed" });
  } catch (err) {
    console.log("req.body", req.body);

    console.log("err", err);
    return res.status(401).json({ status: "login failed" });
  }
};

module.exports.GET_USER = async function (req, res) {
  const data = await UserSchema.aggregate([
    {
      $lookup: {
        from: "tutorials",
        localField: "tutorialIds",
        foreignField: "id",
        as: "userTutorials",
      },
    },
    { $match: { _id: ObjectId(req.params.id) } },
  ]).exec();

  console.log(data);

  return res.status(200).json({ user: data });
};

module.exports.GET_ALL_USERS = async function (req, res) {
  const data = await UserSchema.find().exec();

  console.log(data);

  return res.status(200).json({ user: data });
};
