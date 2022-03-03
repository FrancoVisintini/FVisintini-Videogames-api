const { Router } = require('express');
const router = Router();
const getGenres = require('../controllers/Ctrl-Genres')


router.get('/', async(req,res)=>{
    let allGenre = await getGenres();
    res.status(200).send(allGenre);
})

module.exports = router;
