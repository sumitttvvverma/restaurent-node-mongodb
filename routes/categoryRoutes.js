const express = require("express");

const authMiddleware = require("../middlewares/authMiddlewares");
const {
  createCatController,
  getAllCatController,
  updateCatController,
  deleteCatController,
} = require("../controllers/categoryControllers");

const router = express.Router();

//routes
// CREATE CAT
router.post("/create", authMiddleware, createCatController);

//GET ALL CAT
router.get("/getAll", getAllCatController);

// UPDATE CAT
router.patch("/update/:id", authMiddleware, updateCatController);

// DLEETE CAT
router.delete("/delete/:id", authMiddleware, deleteCatController);

module.exports = router;