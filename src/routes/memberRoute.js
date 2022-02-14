const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const auth = require('../middleware/auth');


router.get("/",memberController.getMember);
router.get("/:id",memberController.getMemberById);
router.get("/name/:name",memberController.getMemberByName);


router.post("/add" ,memberController.addMember);

router.put("/:id" ,memberController.updateMember);

router.delete("/:id",memberController.deleteMember);

module.exports= router;