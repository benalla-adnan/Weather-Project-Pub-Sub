import { LightningElement, track, wire } from 'lwc';
import pubSub from 'c/pubSub';
import getWeatherInfo from '@salesforce/apex/WeatherAPI.getWeatherInfo';


export default class WeatherDetails extends LightningElement {

    message;
    ville;
    weatherInfo;

    //weather variables

        temp;
        feels_like;
        humidity;
        zoomLevel = 10;
        map;
        wind;
        description;
        icon;
        desc;
    
    connectedCallback(){
        this.register();
    }

    register(){
        pubSub.subscribe("simple_event",this.handleEvent.bind(this));
    }

    handleEvent(msg){
        this.message = msg?JSON.stringify(msg,null):"no message paylod";
        const formatedMessage = JSON.parse(this.message);
        this.ville = formatedMessage.selectedVille;
    }

    @wire(getWeatherInfo,{ville:'$ville'}) wiredWeather({error,data})
    {

        if(data){
            this.weatherInfo = data;
         this.handleWeatherEvent();
            //  console.log(this.temp);
        }else if(error){
            console.log(error);
        }
    };

    handleWeatherEvent(){
        console.log('ok');
        const parsedData = JSON.parse(this.weatherInfo);
        console.log((parsedData) );
        this.temp = parseInt((parsedData.main.temp) - 273.15);
        this.feels_like = parseInt((parsedData.main.feels_like) - 273.15) ;
        this.humidity= parsedData.main.humidity;
        this.wind = parsedData.wind.speed;
        this.icon = 'http://openweathermap.org/img/wn/'+(parsedData.weather[0].icon).toString()+'.png ';
        
        this.description = (parsedData.weather[0].description).charAt(0).toUpperCase() + (parsedData.weather[0].description).slice(1);
        this.map = [{
            location: {
                Latitude: parsedData.coord.lat,
                Longitude: parsedData.coord.lon
            },
            title: this.ville ,
        }];
        this.desc = this.ville + ',' + this.description;
    }

}