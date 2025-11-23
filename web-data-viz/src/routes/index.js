var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
    res.send("API web-data-viz com Quiz F1 funcionando!");
});

module.exports = router;
