const express = require("express");
const router = express.Router();
const pool = require("../db");
const { verifyToken, isAdmin } = require("../middleware/auth");

// GET /admin/users (list users)
router.get("/users", verifyToken, isAdmin, async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, email, is_blocked FROM clients");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /admin/users/:id/block (block/unblock user)
router.put("/users/:id/block", verifyToken, isAdmin, async (req, res) => {
  const { is_blocked } = req.body;
  try {
    const result = await pool.query("UPDATE clients SET is_blocked = $1 WHERE id = $2 RETURNING *", [
      is_blocked,
      req.params.id,
    ]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /admin/analytics (simple booking stats)
router.get("/analytics", verifyToken, isAdmin, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT cars.model, COUNT(bookings.id) as booking_count
      FROM cars
      LEFT JOIN bookings ON cars.id = bookings.car_id
      GROUP BY cars.id, cars.model
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
