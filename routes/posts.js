const router = require('express').Router();
const verifyToken = require('../middleware/token-verification');

router.get('/', verifyToken, (req, res) => {
    res.json({
        post: {
            title: 'My First Post',
            description: `Random post you shouldn't access`
        }
    });
});

module.exports = router;