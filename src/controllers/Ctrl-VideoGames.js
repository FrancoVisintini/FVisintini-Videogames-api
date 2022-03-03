const axios = require('axios');
const {Videogame, Genre} = require('../db');
const {API_KEY} = process.env


const getGamesApi = async (sbName) => {

    let page = 1;
    try {

        const apiInfoPage1 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=25&search=${sbName}`);
        let current = apiInfoPage1.data
        let apiInfo=current.results;

        if(sbName===''){
            while(page<4){
                page++;
                let  nextPage = await axios.get(current.next)
                apiInfo = apiInfo.concat(nextPage.data.results);
                current = nextPage.data   
            }
        }
    
        const apiGames = apiInfo.map(game => {
    
            if(game.genres){
                game.genres = game.genres.map( e => e.name);
            }
    
            return {
                id : game.id,
                name: game.name,
                rating: game.rating,
                image : game.background_image,
                genres: game.genres,
                
            }
        })
    
        return apiGames;
        
    } catch (error) {
        
        return [];
    }

}

const getGamesDB = async(sbName)=>{

    let gamesDB = await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ['name'],
            through:{
                attributes:[],
            }
        }
    })
    if(sbName!==''){
        gamesDB = gamesDB.filter(g => g.name.toLowerCase().includes(sbName));
    }

    gamesDB = gamesDB.map(g => {
        g.genres = g.genres.map(e => e.name)
        return{
            id: g.id,
            name: g.name,
            image: g.image,
            genres: g.genres,
            rating: g.rating,
            created_in_DB: g.created_in_DB
        }
    })

    return gamesDB; 
     

}


const getAllGames = async(sbName) => {
    
    let gamesApi = await getGamesApi(sbName);
    let gamesDB = await getGamesDB(sbName);

    

    let gamesTotal = gamesDB.concat(gamesApi)

    return gamesTotal;
}


module.exports = {getAllGames}