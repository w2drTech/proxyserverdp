const express = require("express");
const router = express.Router();
const needle = require("needle");

const API_BASE_URL = process.env.API_BASE_URL;

router.get("/", async (req, res) => {
  const apiRes = await needle('get', `${API_BASE_URL}`);
});

module.exports = router;
