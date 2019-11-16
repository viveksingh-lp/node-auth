const router = require('express').Router();
const User = require('../model/User');
const { validateRegistrationData } = require('../validation');

router.post('/register', async (req, res) => {

    // Validate Registration Data
    const {error} = validateRegistrationData(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if email already exists
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) {
        return res.status(400).send('This email is already registered');
    }

    // Create new User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch(err) {
        res.status(400).send(err);
    }
});

module.exports = router;