const express = require("express");
const router = express.Router();

const { State } = require("../../db/models");

const asyncHandler = require("express-async-handler");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const states = await State.findAll();
    res.json(states);
  })
);

module.exports = router;
