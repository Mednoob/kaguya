import { Client } from 'discord.js-light';
import axios from 'axios';
export default class Utility {
   public constructor(public readonly client : Client){}

   public async hastebin(text: string){
   const { data } = await axios.post('https://bin.nezukochan.xyz/documents', { payload: text })
   return `https://bin.nezukochan.xyz/${data}.js`
  }
}
