var express = require("express");
var router = express.Router();
const discountsData = require("./discountData"); // Original data
const { v4: uuidv4 } = require("uuid");
let filterDiscountData = [...discountsData]; // Mutable copy

// Get all discounts
router.get("/", (req, res) => {
  res.status(200).json(filterDiscountData);
});
router.post("/createDiscount", (req, res) => {
  discountObject = req?.body;
  console.log(discountObject, "3845965");
  if (!discountObject || Object.keys(discountObject).length === 0) {
    return res.status(400).json({ message: "Request body is empty" });
  }
  const newId = uuidv4().replace(/\D/g, '').slice(0, 5);
  const newDiscount = {
    id: +newId, // Unique ID
    ...discountObject,
  };
  filterDiscountData.push(newDiscount);
  res.status(201).json({
    message: "New discount added successfully",
    data: discountObject,
  });

});
// Delete a discount by ID
router.delete("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id, 10); // Convert ID to number
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  const initialLength = filterDiscountData.length;

  // Remove the discount with the matching ID
  filterDiscountData = filterDiscountData.filter(
    (discount) => discount.id !== id
  );

  // If the length didn't change, the ID wasn't found
  if (filterDiscountData.length === initialLength) {
    return res.status(404).json({ message: "Discount not found" });
  }

  res.status(200).json({
    message: "Discount deleted successfully",
    data: filterDiscountData, // Return updated data
  });
});

module.exports = router;
