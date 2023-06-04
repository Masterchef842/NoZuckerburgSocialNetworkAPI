const router = require('express').Router();

const {
    getAll,
    getOne,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtControllers');

router.route('/').get(getAll).post(createThought)

router.route('/:id').get(getOne).put(updateThought).delete(deleteThought)

router.route('/:id/reactions').post(addReaction).delete(deleteReaction)
module.exports = router;