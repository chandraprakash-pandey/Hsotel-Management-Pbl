const { Router } = require("express");
const router = Router();
const Bookingcontroller = require("../controller/bookingcontroller");

router.route("/bookroom").post(Bookingcontroller.bookroom);

module.exports = router;