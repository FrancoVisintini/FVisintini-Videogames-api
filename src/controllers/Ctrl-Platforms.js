const axios = require('axios');
const {API_KEY} = process.env

const getPlatforms = async () => {

    const apiInfoPage1 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=40`);
    let current = apiInfoPage1.data
    let apiInfo=current.results;

    const apiPlatforms = apiInfo.map(game => {

        if(game.platforms){
            game.platforms = game.platforms.map(e => e.platform.name)
        }
        return game.platforms
    })

    const apiPlatArray = []

    for(let i=0; i<apiPlatforms.length; i++){
        for(let j=0; j<apiPlatforms[i].length;j++){
            apiPlatArray.push(apiPlatforms[i][j]);
        }
    }

    const uniquePlatforms = [... new Set(apiPlatArray)].sort(function(a,b){
        let c = a.toString().toLowerCase()
        let d = b.toString().toLowerCase() 
        if (c > d) {
            return 1;
        }
        if (c < d) {
            return -1;
        }
        return 0;
    });

    return uniquePlatforms;
}


module.exports = getPlatforms;