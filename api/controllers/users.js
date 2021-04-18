const logger = require("log4js").getLogger();
const Joi = require("joi");
logger.level = "debug";
const response = require("../contracts/response");
const UserModel = require("../models/userModel");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  height: Joi.number().min(100).max(250).required(),
  weight: Joi.number().min(40).max(200).required(),
  dob: Joi.date().allow(null, ""),
  gender: Joi.string().valid("male", "female").required(),
});

function createOrUpdateErrorMsg(res, err, msg) {
  if (err.code) {
    if (err.code === 11000) {
      return response.conflict(
        res,
        `Duplicate key: ${JSON.stringify(err.keyValue)}`,
        err
      );
    }
  }
  return response.internalError(res, msg, err);
}

exports.insert = async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return response.badRequest(res, error.details);
  }
  try {
    const user = await UserModel.insert();
    return response.ok(res, user._id, "Created new user");
  } catch (err) {
    return createOrUpdateErrorMsg(
      res,
      err,
      "Something went wrong while creating new member"
    );
  }
};

exports.health = async (req, res) => {
  return response.ok(res);
};
