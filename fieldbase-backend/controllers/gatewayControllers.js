const Gateway = require("../models/gateway.model");

exports.add = (req, res) => {
  Gateway.create(
    { name: req.body.name, address: req.body.address },
    (err, gateway) => {
      if (err) {
        return res.status(400).json({ err });
      }
      return res.status(201).json({ gateway });
    }
  );
};

exports.index = (req, res) => {};

exports.single = (req, res) => {
  Gateway.findById(req.params.id, function (err, gateway) {
    if (err) {
      return res.status(404).json(err);
    }
    return res.json({ gateway });
  });
};
