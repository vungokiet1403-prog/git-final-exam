const express = require("express");
const router = express.Router();
const foodController = require("../controllers/Food.controller");

router.get("/", foodController.getFoods);
router.post("/", foodController.addFood);
router.put("/:id", foodController.updateFood);
router.post("/order", foodController.createFoodOrder);
router.delete("/:id", foodController.deleteFood);
router.get("/orders", foodController.getFoodOrders);
router.put("/orders/:id/status", foodController.updateFoodOrderStatus);


module.exports = router;