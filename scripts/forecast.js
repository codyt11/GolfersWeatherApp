class Forecast{
    constructor(){
        this.key = 'WmjAN9kuOG3lsIyMMQO8E6DqfFjLfoFD';
        this.weatherURI = 'https://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURI = 'https://dataservice.accuweather.com/locations/v1/cities/search';
        this.forecastURI = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/`;
    }
    async updateCity(city){
        const cityDetails = await this.getCity(city);
        const weather = await this.getWeather(cityDetails.Key);
        const fiveDay = await this.getForecast(cityDetails.Key);
        
        return {
            cityDetails,
            weather,
            fiveDay
        }
    }
    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityURI + query);
        const data = await response.json();
        console.log(data)
        return data[0];
    }
    async getWeather(id){
        const query = `${id}?apikey=${this.key}`;
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
        return data[0];
    }
     async getForecast(id){
        const query = `${id}?apikey=${this.key}`;
        const response = await fetch(this.forecastURI + query);
        const data = await response.json();
        console.log(data.DailyForecasts)
        return data.DailyForecasts;
    }
}


