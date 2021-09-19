const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

router  
    .route('/:id')
    .get(getUserById)
    .delete(deleteUser)
    .put(updateUser)

router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend)

module.exports = router;