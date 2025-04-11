const { Router } = require("express");
const router = Router();
const roomcontroller = require("../controller/roomcontroller")

const Room = require('../models/rooms')

router.route("/search").get(roomcontroller.searchroom)
router.route("/registerrooms").post(roomcontroller.createroom);

module.exports = router;