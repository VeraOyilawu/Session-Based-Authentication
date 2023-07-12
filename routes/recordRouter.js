const express = require("express")
const router = express.Router()
const userRecords = require("../controllers/recordController")
const {isLoggedIn} = require("../middlewares/authMiddleware")

router.route("/records").post(isLoggedIn, userRecords.createRecord)
router.route("/Allrecords").get(isLoggedIn, userRecords.readRecords)
router.route("/usersRecords").get(isLoggedIn, userRecords.readAllRecordsOfUser)
router.route("/record/:id").get(isLoggedIn, userRecords.readRecord)
// router.route().patch()
// router.route().delete()

module.exports = router