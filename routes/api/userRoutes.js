const router = require('express').Router();
const {
    getAllUsers,
    createUser,
    getOneUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
}   = require("../../controllers/userControllers.js")

router.route('/').get(getAllUsers).post(createUser)

router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser);

router.route('/friends/:userId').post(addFriend).delete(removeFriend);

module.exports = router;