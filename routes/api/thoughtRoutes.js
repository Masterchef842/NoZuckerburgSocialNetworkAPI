const router = require('express').Router();

const {
    getAll,
    createThought
} = require('../../controllers/thoughtControllers');

router.route('/').get(getAll).post(createThought)
module.exports = router;