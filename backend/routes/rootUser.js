const express = require("express");
const router = express.Router();
const { validateReq } = require("../middlewares/error");
const signIn = require("../controllers/rootUser");
const { validateSignIn } = require("../validators/rootUser");

router.post("/signin", validateReq(validateSignIn), signIn);

module.exports = router;
