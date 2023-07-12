const express = require("express")
const router = express.Router()
const { signUp, signIn, signOut, allUsers } = require("../controllers/userController")

router.route("/signup").post(signUp)
router.route("/signIn").post(signIn)
router.route("/signout").get(signOut)
router.route("/allUsers").get(allUsers)
// router.route().patch()
// router.route().delete()

module.exports = router