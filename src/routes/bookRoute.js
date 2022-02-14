const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');



router.get("/",bookController.getBooks);
router.get("/:id",bookController.getBookById);
router.get("/name/:name",bookController.getBookByName);


router.post("/add", bookController.addBook);

router.put("/:id", bookController.updateBook);

router.delete("/:id",bookController.deleteBook);


module.exports= router;