const { thought, user } = require('../models/index');

const userController = {
    getAllUsers(req, res) {
        user.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400)
            });
    },
    getUserById({ params }, res) {
        user.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })

            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            });
    },
    createUser({ body }, res) {
        user.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },
    deleteUser({ params }, res) {
        user.findOneAndDelete({ _id: params.id })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },
    updateUser({ params, body }, res) {
        user.findOneAndUpdate({ _id: params.id }, body, { new: true })

            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(400).json({ message: 'No users with this id exist!' });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err));
    },
    addFriend({ params }, res) {
        user.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No users with this id exist!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    deleteFriend({ params }, res) {
        user.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    }
}
module.exports = userController;