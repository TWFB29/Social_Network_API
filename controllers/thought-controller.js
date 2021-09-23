const {thought, user} = require('../models/index');

const thoughtController = {
    getAllThoughts(req, res) {
        thought.find({})
        .populate({
            path: 'user',
            select: '-__v'
        })
        .select('-__v')
        .sort ({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400)
        });
    },
    getThoughtById({ params }, res) {
        thought.findOne({ _id: params.id })
        .populate({
            path: 'user',
            select: '-__v'
        })
        
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        });  
    },
    addThought({ params, body }, res) {
        return thought.create(body)
        .then(({ _id}) => {
            return user.findOneAndUpdate(
                { username: body.username},
                { $addToSet: { thoughts: _id }},
                { new: true}
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({ message: 'This user name does not exist!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));    
    },
    changeThought ({ params, body }, res) {
        thought.findOneAndUpdate({ _id: params.id}, body, {new: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(400).json({ message: 'No thoughts with this id exist!'});
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.status(400).json(err));
    },
    removeThought ({ params }, res) { 
        thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(400).json({ message: 'No thoughts with this id exist!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err))
    },
    addReaction ({ params, body }, res) {
        thought.findOneAndUpdate(
           { _id: params.thoughtId },
           { $push: { reactions: body } },
           { new: true}
       )
       .then(dbThoughtData => {
           if (!dbThoughtData) {
               res.status(400).json({ message: 'No thoughts with this id exist!'});
               return;
           }
           res.json(dbThoughtData);
       })
       .catch(err => res.json(err));
   },
   deleteReaction({ params }, res) {
    thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: {reactions: params.reactionId} },
        {new: true }
    )
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => res.json(err));
}
}

module.exports = thoughtController;