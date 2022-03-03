const { Router } = require('express');
const router = Router();

const routerVideoGames = require('./routerVideoGames');
const routerGenre = require('./routerGenre');
const routerGame = require('./routerGame')
const routerPlatform = require('./routerPlatform')

router.use('/videogames', routerVideoGames);
router.use('/genres', routerGenre);
router.use('/videogame', routerGame);
router.use('/platforms', routerPlatform);


module.exports = router;
