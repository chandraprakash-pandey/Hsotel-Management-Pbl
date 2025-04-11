const { Router } = require("express");
const router = Router();
const ownercontroller = require("../controller/ownercontroller")


router.route("/").get(ownercontroller.getallowners)
router.route("/register").post(ownercontroller.ownerSignUp);
router.route("/login").post(ownercontroller.ownerlogin);


module.exports = router;