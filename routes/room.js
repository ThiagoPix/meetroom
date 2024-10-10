const express = require('express');
const { check, validationResult } = require('express-validator');
const { createRoom, listRooms, joinRoom } = require('../controllers/roomController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post(
    '/',
    [
        auth,
        [
            check('name', 'Room name is required').not().isEmpty(),
            check('capacity', 'Room capacity is required and should be a number').isInt()
        ]
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    createRoom
);

router.get('/', auth, listRooms);
router.post('/join', auth, joinRoom);

module.exports = router;