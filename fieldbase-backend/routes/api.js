const {
  add,
  index,
  single,
  addPeripheral,
  updatePeripheral,
  removePeripheral,
} = require("../controllers/gatewayControllers");
const validators = require("../validators/gateway-validators");

const router = require("express").Router();

router.post("/add", validators.addGateway, add);
router.get("/gateways", index);
router.get("/gateway/:id", single);
router.post("/gateway/:id/peripheral", validators.addPeripheral, addPeripheral);
router.post("/gateway/:id/update-peripheral", updatePeripheral);
router.post("/gateway/:id/remove-peripheral", removePeripheral);
module.exports = router;
