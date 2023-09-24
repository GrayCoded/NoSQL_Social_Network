const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    updateFriend,
    removeFriend,

} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getSingleUser).put(updateUser);
router.route('/:userId').get(getSingleUser).delete(deleteUser);
router.route('/:userId/friends').post(addFriend);
router.route('/:userId/friends').put(updateFriend);
router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;
