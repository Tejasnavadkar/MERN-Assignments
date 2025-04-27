import axios from "axios"
import { CacheService } from "../services/cache.service.js";

export const getWeatherDataService = async (cityName) =>{

    try {

     const cachedData = await CacheService.getCache(cityName)
     console.log('cached data',cachedData)
     if(cachedData !== null ){
      return {
        status:200,
        data:cachedData,
        cached:true
      }
     }
        
    const response = await axios.get(`${process.env.BASE_URL}/data/2.5/weather?q=${cityName}&appid=${process.env.API_KEY}&units=metric`)
    await CacheService.setCache(cityName,response.data)
    return response
    
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message)    
    }
}



