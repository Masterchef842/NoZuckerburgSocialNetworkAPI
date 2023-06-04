const router = require('express').Router();

const {
    getAll,
    getOne,
    createThought
} = require('../../controllers/thoughtControllers');

router.route('/').get(getAll).post(createThought)

router.route('/:id').get(getOne)
module.exports = router;