const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('index');
    // res.send("HOLA")
});

module.exports = router;