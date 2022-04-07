const Gateway = require("../models/gateway.model");
const { v4: uuid } = require("uuid");

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

exports.addPeripheral = (req, res) => {
  Gateway.findById(req.params.id, function (err, gateway) {
    if (err) {
      return res.status(404).json({ message: "Gateway not found" });
    }
    if (gateway?.devices?.length < 10) {
      gateway.devices.push({
        uid: uuid(),
        vendor: req.body.vendor,
        status: req.body.status,
      });
      gateway.save(function (err) {
        if (err) {
          return res
            .status(400)
            .json({ message: "There was an error adding device" });
        }
        return res.json({ gateway });
      });
    } else {
      return res
        .status(400)
        .json({ message: "You have reached the maximum of 10 devices" });
    }
  });
};
