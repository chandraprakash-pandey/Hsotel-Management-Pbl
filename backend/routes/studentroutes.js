const { Router } = require("express");
const router = Router();
const studentcontroller = require("../controller/studentcontroller")

const Student = require('../models/student')

router.route("/").get(studentcontroller.getallstudents)
router.route('/register').post(studentcontroller.studentSignUp);
router.route('/login').post(studentcontroller.studentlogin);
module.exports = router;