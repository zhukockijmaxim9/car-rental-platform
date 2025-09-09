const express = require("express");
const router = express.Router();
const pool = require("../db");
const { verifyToken, isAdmin } = require("../middleware/auth");
const { body, query, validationResult } = require("express-validator");

// GET /cars (list with optional filters)
router.get(
  "/",
  [
    query("model").optional().trim(),
    query("minPrice").optional().isFloat({ min: 0 }),
    query("maxPrice").optional().isFloat({ min: 0 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { model, minPrice, maxPrice } = req.query;
    let queryText = "SELECT * FROM cars WHERE is_available = TRUE";
    const queryParams = [];

    if (model) {
      queryParams.push(`%${model}%`);
      queryText += ` AND model ILIKE $${queryParams.length}`;
    }
    if (minPrice) {
      queryParams.push(minPrice);
      queryText += ` AND price_per_day >= $${queryParams.length}`;
    }
    if (maxPrice) {
      queryParams.push(maxPrice);
      queryText += ` AND price_per_day <= $${queryParams.length}`;
    }

    try {
      const result = await pool.query(queryText, queryParams);
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// POST /cars (admin only)
router.post(
  "/",
  verifyToken,
  isAdmin,
  [body("model").notEmpty(), body("year").isInt({ min: 1900, max: 2026 }), body("price_per_day").isFloat({ min: 0 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { model, year, price_per_day } = req.body;
    try {
      const result = await pool.query("INSERT INTO cars (model, year, price_per_day) VALUES ($1, $2, $3) RETURNING *", [
        model,
        year,
        price_per_day,
      ]);
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
