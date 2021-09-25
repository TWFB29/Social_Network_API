// const thoughtController = require('../../controllers/thought-controller');

const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    addThought,
    changeThought,
    removeThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller')

router
    .route('/')
    .get(getAllThoughts)
    .post(addThought)

router
    .route('/:id')
    .get(getThoughtById)
    .put(changeThought)
    .delete(removeThought)

router
    .route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(deleteReaction)

module.exports = router;
    