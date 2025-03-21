var express = require("express");
var router = express.Router();
const discountsData = require("./discountData"); // Original data
const { v4: uuidv4 } = require("uuid");
let filterDiscountData = [...discountsData]; // Mutable copy
const connection = require("./db_connection");
// Get all discounts
router.get("/", (req, res) => {
  res.status(200).json(filterDiscountData);
});

//Get particular discount
router.get("/:id", (req, res) => {
  const id = Number.parseInt(req.params.id); // Convert ID to number
  const discount = filterDiscountData.find((discount) => discount.id === id);

  if (!discount) {
    return res.status(404).json({ message: "Discount not found" });
  }

  res.status(200).json(discount); // Return found discount
});
router.post("/createDiscount", (req, res) => {
  discountObject = req?.body;
  console.log(discountObject, "3845965");
  if (!discountObject || Object.keys(discountObject).length === 0) {
    return res.status(400).json({ message: "Request body is empty" });
  }
  const newId = uuidv4().replace(/\D/g, "").slice(0, 5);
  const newDiscount = {
    id: +newId, // Unique ID
    ...discountObject,
  };
  filterDiscountData.push(newDiscount);
  res.status(200).json({
    message: "New discount added successfully",
    data: discountObject,
  });
});
router.post("/create", (req, res) => {
  const {
    title,
    status,
    type,
    discountTiers,
    selectedProduct,
    productOptions,
    tagsOptions,
    collectionOptions,
    discountStrategy,
    combinations,
    startDate,
    endDate,
    endDateStatus,
  } = req.body;
  console.log(req.body, "89435658954");
  const sql = `INSERT INTO discounts 
  (title, status, type, discountTiers, selectedProduct, productOptions, tagsOptions, 
   collectionOptions, discountStrategy, combinations, startDate, endDate, endDateStatus) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, STR_TO_DATE(?, '%d-%m-%Y'), STR_TO_DATE(?, '%d-%m-%Y'), ?);
`;
  const values = [
    title,
    status,
    type,
    JSON.stringify(discountTiers),
    selectedProduct,
    JSON.stringify(productOptions),
    JSON.stringify(tagsOptions),
    JSON.stringify(collectionOptions),
    discountStrategy,
    JSON.stringify(combinations),
    startDate,
    endDate || null,
    endDateStatus,
  ];
  console.log(values, "4856054");
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("error inserting discounts: ", err);
      return res.status(500).json({ message: err });
    }
    res
      .status(201)
      .json({ message: "✅ Discount added successfully", id: result.insertId });
  });
});
router.put("/:id", (req, res) => {
  const id = Number.parseInt(req.params.id); // Convert ID to number
  const updatedData = req.body;

  // Find index of the discount
  const index = filterDiscountData.findIndex((discount) => discount.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Discount not found" });
  }

  // Update discount details
  filterDiscountData[index] = { ...filterDiscountData[index], ...updatedData };

  res.status(200).json({
    message: "Discount updated successfully",
    data: filterDiscountData[index],
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
