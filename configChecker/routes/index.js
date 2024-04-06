var express = require("express");
var router = express.Router();
var cron = require("node-cron");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

cron.schedule(" */2 * * * * *", () => {
  console.log("A cron job that runs every 2 seconds");
});

module.exports = router;
