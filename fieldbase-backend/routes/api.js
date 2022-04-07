const {
  add,
  index,
  single,
  addPeripheral,
} = require("../controllers/gatewayControllers");
const validators = require("../validators/gateway-validators");

const router = require("express").Router();

router.post("/add", validators.addGateway, add);
router.get("/gateways", index);
router.get("/gateway/:id", single);
router.post("/gateway/:id/peripheral", validators.addPeripheral, addPeripheral);

module.exports = router;
