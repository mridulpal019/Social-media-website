const express=require('express');

const router= express.Router();

const friendsController=require('../controllers/friends_controller');



router.post('/add/:id',friendsController.add);
router.post('/remove/:id',friendsController.remove);

module.exports=router;
