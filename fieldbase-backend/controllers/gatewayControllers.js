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

exports.index = (req, res) => {
  Gateway.find({}, function (err, gateways) {
    if (err) {
      return res.status(400).json("Error fetching gateways");
    }
    return res.json({ gateways });
  });
};

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

exports.updatePeripheral = (req, res) => {
  Gateway.findById(req.params.id, async function (err, gateway) {
    if (err) {
      return res.status(404).json({ message: "Gateway not found" });
    }
    if (gateway.devices.id(req.body.id).status === "online") {
      gateway.devices.id(req.body.id).status = "offline";
    } else {
      gateway.devices.id(req.body.id).status = "online";
    }
    await gateway.save();
    return res.json({ gateway });
  });
};

exports.removePeripheral = (req, res) => {
  Gateway.findById(req.params.id, async function (err, gateway) {
    if (err) {
      return res.status(404).json({ message: "Gateway not found" });
    }
    gateway.devices.id(req.body.id).remove();
    await gateway.save();
    return res.json({ gateway });
  });
};
