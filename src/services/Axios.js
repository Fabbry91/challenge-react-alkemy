import axios from 'axios';

const httpInstance= axios.create({
    baseURL:`${process.env.REACT_APP_API_URL}`
});
export default httpInstance;