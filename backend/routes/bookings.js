const express = require("express");
const router = express.Router();
const pool = require("../db");
const { verifyToken } = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

// POST /bookings (user creates booking)
router.post(
  "/",
  verifyToken,
  [body("car_id").isInt(), body("start_date").isDate(), body("end_date").isDate()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { car_id, start_date, end_date } = req.body;
    try {
      const result = await pool.query(
        "INSERT INTO bookings (client_id, car_id, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING *",
        [req.user.id, car_id, start_date, end_date]
      );
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// GET /bookings (user sees their bookings)
router.get("/", verifyToken, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM bookings WHERE client_id = $1", [req.user.id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
