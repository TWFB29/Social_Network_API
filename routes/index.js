const router = require('express').Router();
const userRoute = require('./api/users-route');
const thoughtRoute = require('./api/thoughts-route');

router.use('/', userRoute);
router.use('/', thoughtRoute);

module.exports = router;