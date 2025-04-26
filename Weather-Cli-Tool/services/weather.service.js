import axios from "axios"


export const getWeatherDataService = async (cityName) =>{

    try {
        
    const response = await axios.get(`${process.env.BASE_URL}/data/2.5/weather?q=${cityName}&appid=${process.env.API_KEY}&units=metric`)
    return response
    
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message)    
    }
}



