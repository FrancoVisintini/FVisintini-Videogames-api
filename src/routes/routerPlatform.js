const { Router } = require('express');
const router = Router();
const getPlatforms = require('../controllers/Ctrl-Platforms')


router.get('/', async(req,res)=>{
    let allPlatforms = await getPlatforms();
    res.status(200).send(allPlatforms);
})

module.exports = router;
