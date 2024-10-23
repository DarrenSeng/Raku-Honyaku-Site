const express = require("express");
const router = express.Router();
const {
    createUser,
    verifyEmail,
    getUserById,
    getAllUsers,
    getUserStudylists,
    addToStudylists,
    removeFromStudylists,
    createNewList,
    deleteList
} = require("../controllers/usersController");

router.post("/", createUser);

router.get("/:id/verify/:token", verifyEmail);

router.get("/:authUser", getUserById);

router.get("/studylists/:uid", getUserStudylists);

//function to add jmdict word to studylist. input is uid, title, word
router.post("/studylists/add/:uid/:title/:word", addToStudylists)

router.post("/studylists/remove/:uid/:title/:word", removeFromStudylists)

router.post("/studylists/create/:uid/:title", createNewList)

router.post("/studylists/delete/:uid/:title", deleteList)

router.get("/", getAllUsers);

module.exports = router;
