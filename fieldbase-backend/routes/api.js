const { add, index, single } = require("../controllers/gatewayControllers");
const validators = require("../validators/gateway-validators");

const router = require("express").Router();

router.post("/add", validators.addGateway, add);
router.get("/gateways", index);
router.get("/gateway/:id", single);

module.exports = router;
