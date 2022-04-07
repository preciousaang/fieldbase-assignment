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
    .custom(async (value) => {
      const gateway = await Gateway.countDocuments({ address: value });
      if (gateway > 0) {
        return Promise.reject("A gateway with that ip address already exists");
      }
    })
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
    next();
  }
};

exports.addPeripheral = async (req, res) => {
  await body("vendor").notEmpty().bail().withMessage("Required").run(req);
  await body("status")
    .isIn(["online", "offline"])
    .bail()
    .withMessage("Must either be online offline")
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
    next();
  }
};
