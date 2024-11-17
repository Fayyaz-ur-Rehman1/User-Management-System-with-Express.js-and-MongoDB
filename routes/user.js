const express = require("express");
const { getAllUsersHtmlDocument, getAllUsersJsonFormet, getSpecificUsers, deleteUser, editUser, createUser } = require("../controllers/user");
const router = express.Router();

// list all user with HTML document
router.get("/", getAllUsersHtmlDocument)

// get data or create data
router.route("/api")
    .get(getAllUsersJsonFormet)
    .post(createUser);

// Get Specific get delte edit
router.route("/api/:id")
    .get(getSpecificUsers)
    .delete(deleteUser)
    .patch(editUser);

module.exports = router