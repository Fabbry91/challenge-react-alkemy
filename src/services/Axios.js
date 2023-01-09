import axios from 'axios';

const httpInstance = axios.create({
    baseURL: `https://superhero-search.p.rapidapi.com/api/heroe`,
    headers: {
        'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
        'X-RapidAPI-Host': 'superhero-search.p.rapidapi.com'
    }
});
export default httpInstance;