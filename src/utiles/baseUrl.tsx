import { create } from 'apisauce'
export const mainUrl="http://localhost:5000/"
 
export const api = create({
    baseURL: mainUrl+'api/v1/',
    headers: { Accept: 'application/vnd.github.v3+json' ,'Content-Type':'application/json'},
   });

  