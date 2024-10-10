const express = require('express');
const { register, login } = require('../controllers/authController');
const { check, validationResult } = require('express-validator');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.post(
    '/register',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Invalid email').isEmail(),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    register
);

router.post(
    '/login',
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    login
);

module.exports = router;