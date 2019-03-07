const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/documentation.html');
});

module.exports = router;
