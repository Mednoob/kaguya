import axios from 'axios';
const baseURL = "https://nekos.life/api/v2/img/";
export default class Fun {
     public async poke(){
       const { data } = await axios.get(baseURL + "poke")
       return data.url
     }
 }
