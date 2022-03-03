const { Router } = require('express');
const router = Router();
const { getAllGames} = require('../controllers/Ctrl-VideoGames')


router.get('/', async(req,res)=>{

    const sbName = req.query.name ? req.query.name : '';
 
    let allGames = await getAllGames(sbName);

    if(sbName!==''){
        let filteredGame = await allGames
        filteredGame.length>0 ? res.status(200).send(filteredGame.slice(0,15)) : res.status(404).send('videogame not found');  
    }
    else{
        res.status(200).send(allGames)
    }
       
})
 

module.exports = router;