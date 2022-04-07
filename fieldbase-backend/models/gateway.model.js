const { Schema, model } = require("mongoose");

const deviceSchema = new Schema({
  name: String,
  uid: String,
  vendor: String,
  status: {
    type: String,
    enum: ["online", "offline"],
  },
});

const gatewaySchema = new Schema(
  {
    vendor: String,
    address: String,
    devices: [deviceSchema],
  },
  { timestamps: true }
);

const Gateway = model("Gateway", gatewaySchema);

module.exports = Gateway;
