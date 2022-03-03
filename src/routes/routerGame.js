const { Router } = require('express');
const router = Router();
const {getGameDetail, deleteGame, createGame} = require('../controllers/Ctrl-Game')

router.get('/:id', async(req, res)=>{
    let id = req.params.id;

    try {
        let gameDetail = await getGameDetail(id);
        res.status(200).send(gameDetail)

    } catch (error) {
        res.status(404).send('videogame not found');    
    }
    
})

router.put('/:id', async(req,res)=>{
    let id = req.params.id;
    try{
        deleteGame(id);
        res.status(200).send('videogame deleted') 
    }catch (error) {
        res.status(404).send('videogame cannot be deleted');    
    }
})


router.post('/', async(req,res)=>{
    let = {
        name,
        image,
        description,
        platforms,
        released,
        rating,
        genre,
        created_in_DB
    } = req.body

    try {
        createGame(name,image,description, platforms, released, rating, genre, created_in_DB);
        res.status(200).send('videogame successfully created')
    } catch (error) {
        res.status(404).send('videogame cannot be created')
    }
    
})


module.exports = router;