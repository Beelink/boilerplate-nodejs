const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  // console.log(req);
  res.send("/user/login");
});

module.exports = router;
