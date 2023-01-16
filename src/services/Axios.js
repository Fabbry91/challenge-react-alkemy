import axios from 'axios';

//configuracion api
const httpInstance = axios.create({
    baseURL: `https://superhero-search.p.rapidapi.com/api/`,
    headers: {
        'X-RapidAPI-Key': '775c699a79msh1e33de4f97f8b2bp1249aejsn3a53e740d14f',
        'X-RapidAPI-Host': 'superhero-search.p.rapidapi.com'
    }
});

//get Heroes
const getHeroes = async () => {
    const response = await httpInstance.get('/heroes');
    return response;
};

//get Villanos
const getVillains = async () => {
    const response = await httpInstance.get('/villains');
    return response;
};

//get Busqueda
const getSearch = async (searchName) => {
    const response = await httpInstance.get({
        params: { hero: `${searchName}` }
    });
    return response;
};

export {
    getHeroes,
    getSearch,
    getVillains  
} 
