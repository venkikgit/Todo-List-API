
const express = require('express');
const passport  = require('passport');

const router = express.Router();

const listController = require('../controllers/listController');

router.post('/create-todo',passport.authenticate('jwt',{session:false}), listController.createTodo);
router.get('/',passport.authenticate('jwt',{session:false}),listController.getAll);
router.delete('/delete/:id',passport.authenticate('jwt',{session:false}),listController.delete);
router.patch('/update-todo/:id',passport.authenticate('jwt',{session:false}),listController.update);

module.exports = router;