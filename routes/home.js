const express = require('express');
const router = express.Router();

router.get('/', (req,res) => res.render('index', {title: 'Express app', message: 'Learning express'}));
module.exports = router;
