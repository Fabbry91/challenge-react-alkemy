import axios from 'axios';

//configuracion api
const httpInstance = axios.create({
    baseURL: `https://akabab.github.io/superhero-api/api/`

});

//get Heroes
const getHeroes = async () => {
    const response = await httpInstance.get('/all.json');
    return response;
};

//get Id
const getById = async (id) => {
    const response = await httpInstance.get(`/id/${id}.json`);
    return response;
};

/*/get Busqueda
const getSearch = async (searchName) => {
    const httpInstance = axios.create({
        baseURL: `https://akabab.github.io/superhero-api/api/id`,
        /*params: { hero: `${searchName}` },
        headers: {
            'X-RapidAPI-Key': '775c699a79msh1e33de4f97f8b2bp1249aejsn3a53e740d14f',
            'X-RapidAPI-Host': 'superhero-search.p.rapidapi.com'
        },

    });
    const response = await httpInstance.get();
    return response;
};
*/
export {
    getHeroes,
    //getSearch,
    getById
} 
