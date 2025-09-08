const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Backend is running" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
