var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
    res.send("API Quiz F1 funcionando!");
});

module.exports = router;