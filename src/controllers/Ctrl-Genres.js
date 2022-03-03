const axios = require('axios');
const {Genre} = require('../db');
const {API_KEY} = process.env;

const putInDb = async(req,res)=>{
    
    const apiInfo = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    
    const genreApi = await apiInfo.data.results;

    genreApi.forEach(async (e) => {
        await Genre.findOrCreate({
            where: {name: e.name}
        })
    });

    const allGenre = await Genre.findAll();
    return allGenre
}

const getGenres = async(req,res)=>{

    let allGenre = await Genre.findAll();

    if(!allGenre.length){ 
        allGenre = await putInDb();
        return allGenre
    }
    
    return allGenre;
}


module.exports =  getGenres;