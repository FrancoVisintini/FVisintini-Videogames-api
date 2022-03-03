const axios = require('axios');
const {Videogame, Genre} = require('../db');
const {API_KEY} = process.env

const getGameDetailAPI = async function (id) {
 
    const apiDetail = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    const gameDetail = apiDetail.data;

    return {
        id : gameDetail.id,
        name: gameDetail.name,
        image: gameDetail.background_image,
        description: gameDetail.description_raw,
        platforms: gameDetail.platforms ? gameDetail.platforms.map(e => e.platform.name) : [],
        released: gameDetail.released,
        rating: gameDetail.rating,
        genres: gameDetail.genres ? gameDetail.genres.map( e => e.name) : [],

    }
}

const getGameDetailDB = async(id)=>{

    let gameDB = await Videogame.findOne({
        where : {id: id},
        include: {
            model: Genre,
            attributes: ['name'],
            through:{
                attributes:[],
            }
        }
    })

    gameDB.genres = gameDB.genres.map(e => e.name)
   
    return {
        id: gameDB.id,
        name: gameDB.name,
        image: gameDB.image,
        description: gameDB.description,
        platforms: gameDB.platforms ,
        released: gameDB.released,
        rating: gameDB.rating,
        genres: gameDB.genres
    }
}

const getGameDetail = async function (id) {

    try {
        if(id.length<10){
            return getGameDetailAPI(id)
        }
        return getGameDetailDB(id);
    } catch (error) {
        throw new Error
    }

}

const deleteGame = async function(id){
    try{
        await Videogame.destroy({
            where : {id: id},
            include: {
                model: Genre,
                attributes: ['name'],
                through:{
                    attributes:[],
                }
            }
        })
    }catch(error){
        throw new Error('videogame cannot be deleted')
    }
}

const createGame = async function(name,image,description, platforms, released, rating, genre, created_in_DB){

    let gameCreated = await Videogame.create({
        name,
        image,
        description,
        platforms,
        released,
        rating,
        created_in_DB
    })

    let genreDB = await Genre.findAll({
        where : {name: genre}
    })

    gameCreated.addGenre(genreDB);

}


module.exports = {
    getGameDetail,
    deleteGame,
    createGame
}