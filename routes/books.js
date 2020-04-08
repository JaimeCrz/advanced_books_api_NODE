const express = require('express');
const router = express.Router();
const  booksController  = require('../controllers/booksController')

router
.get('/', booksController.index)
.get('/:id', booksController.show)

module.exports = router;
