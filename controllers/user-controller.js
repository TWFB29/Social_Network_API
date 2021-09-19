const {thought, user} = require('../models/index');

const userController = {
    getAllUsers(req, res) {
        user.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        select('-__v')
        .sort ({ _id: -1 })
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
      }
}

module.exports = userController;