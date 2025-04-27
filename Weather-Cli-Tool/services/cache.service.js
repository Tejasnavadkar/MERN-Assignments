import fs from 'fs/promises'
// import { json } from 'stream/consumers';

const CASHE_FILE = 'weather-cache.json'
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

export class CacheService {
    // to get cache
    static async getCache(cityName) {

       try {
         // now get stored cache from weather-Cache.json file 
         const cache = await fs.readFile(CASHE_FILE, 'utf-8')
         const cachedData = JSON.parse(cache)
 
         if (cachedData[cityName]) {
             const { timestamp, data } = cachedData[cityName]
             // Check if cache is still valid (within 30 minutes)
             if (Date.now() - timestamp < CACHE_DURATION) {

                // console.log('CACHE_DURATION',CACHE_DURATION)
                // console.log('time:',Date.now() - timestamp)
                 return data;
             }
         }
         return null

       } catch (error) {
         return null
       }
    }

    // create cache for first time

    static async setCache(cityName,data){
        try {

            let cacheData = {}

            try {

              const existingCache = await fs.readFile(CASHE_FILE,'utf-8')
              cacheData = JSON.parse(existingCache)
            } catch (error) {
                console.error(error)
            }

            cacheData[cityName] = {
                timestamp:Date.now(),
                data:data
            }

            // console.log('cachedData:',cacheData,'cityName:',cityName)

           await fs.writeFile(CASHE_FILE,JSON.stringify(cacheData,null,2))
            
        } catch (error) {
            console.log('err message-',error.message)

            console.error('error while creating cache',error)
            
        }

    }
}