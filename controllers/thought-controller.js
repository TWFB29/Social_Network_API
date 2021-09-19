const {thought, user} = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        thought.find({})
        .populate({
            path: 'user',
            select: '-__v'
        })
        select('-__v')
        .sort ({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400)
        });
    },
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
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
    createThought({ params, body }, res) {
        return Thought.create(body)
        .then(({ _id}) => {
            return User.findOneAndUpdate(
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
    updateThought ({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id}, body, {new: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(400).json({ message: 'No thoughts with this id exist!'});
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.status(400).json(err));
    },
    deleteThought ({ params }, res) { 
        Thought.findOneAndDelete({ _id: params.id })
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
        Thought.findOneAndUpdate(
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
       .catch(err => res.status(500).json(err))
   },
   deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: {reactions: params.reactionId} },
        {new: true }
    )
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => res.json(err));
}
}

module.exports = thoughtController;