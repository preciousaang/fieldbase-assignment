const { body, validationResult } = require("express-validator");
const Gateway = require("../models/gateway.model");

exports.addGateway = async (req, res, next) => {
  await body("name")
    .notEmpty()
    .bail()
    .withMessage("Required")
    .custom(async (value) => {
      const gateway = await Gateway.countDocuments({ name: value });
      if (gateway > 0) {
        return Promise.reject("A gateway with that name already exists");
      }
    })
    .run(req);
  await body("address")
    .notEmpty()
    .bail()
    .withMessage("Required")
    .isIP(4)
    .withMessage("Must be a valid ip address")
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
    next();
  }
};
