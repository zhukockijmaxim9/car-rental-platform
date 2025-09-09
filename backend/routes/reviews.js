const express = require("express");
const router = express.Router();
const pool = require("../db");
const { verifyToken } = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

// POST /reviews (user creates review)
router.post(
  "/",
  verifyToken,
  [body("car_id").isInt(), body("rating").isInt({ min: 1, max: 5 }), body("comment").optional().trim()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { car_id, rating, comment } = req.body;
    try {
      const result = await pool.query(
        "INSERT INTO reviews (client_id, car_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *",
        [req.user.id, car_id, rating, comment]
      );
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// GET /reviews (for a car)
router.get("/:car_id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM reviews WHERE car_id = $1", [req.params.car_id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
