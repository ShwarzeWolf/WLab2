import React, {Component} from 'react';
import './App.css';

class WeatherBlock extends Component {
   constructor(props) {
        super(props);
        this.state = {
            weatherData: undefined,
            errorOccurred: false,
            errorMessage: undefined,
            cityName: props.cityName,
            latitude: props.latitude,
            longitude: props.longitude
        };
    }

   formRequest(){
        const name = this.state.cityName;
        const latitude = this.state.latitude;
        const longitude = this.state.longitude;

        if (!!name)
            return "http://api.openweathermap.org/data/2.5/weather?q=" +
                name +
                "&appid=f51bcfb8b207b0ef58ce10da80b90477";

        if (!!latitude && !!longitude)
            return "http://api.openweathermap.org/data/2.5/weather?lon=" +
                longitude + "&lat=" + latitude +
                "&appid=f51bcfb8b207b0ef58ce10da80b90477";

        return null;
    }

   componentDidMount() {
        const URL = this.formRequest();

        fetch(URL)
            .then(res => res.json())
            .then(json => {
                if (json.cod === 200) {
                    this.setState({errorOccurred: false});
                    this.setState({errorMessage: undefined});
                    this.setState({weatherData: json});
                }
                else {
                    this.setState({errorMessage: json.message});
                    this.setState({errorOccurred: true})
                }
        });
    }

    render() {
        const weatherData = this.state.weatherData;

        if (!weatherData)
            if (this.state.errorOccurred)
                return(
                    <div className="errorBlock">
                        <div>Что-то пошло не так. Причина:</div>
                        <div>{this.state.errorMessage}</div>
                    </div>
                );
            else
                return(<div>Подождите, данные загружаются</div>);


        const iconUrl = "http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png";

        return (
            <div class="weatherInfo">
                <p>Название города: {weatherData.name}</p>
                <p>Иконка погоды: <img src={iconUrl} alt={weatherData.description} /></p>
                <p>Температура: {weatherData.main.temp}°</p>
                <p>Ветер: {weatherData.wind.speed}</p>
                <p>Облачность: {weatherData.clouds.all}</p>
                <p>Давление: {weatherData.main.pressure}</p>
                <p>Влажность: {weatherData.main.humidity} </p>
                <p>Координаты: [{weatherData.coord.lon} {weatherData.coord.lat}]</p>
            </div>
        );
    }
}

class CurrentCity extends Component{
    constructor(props){
        super(props);
        this.state = {
            cityName : "Surgut",
            latitude : undefined,
            longitude: undefined
        }
    }

    render(){
        return(
            <div className="currentCity">
                <h1>Погода здесь</h1>
                <button>Обновить геолокацию</button>
                <WeatherBlock cityName={this.state.cityName} latitude={this.state.latitude} longitude={this.state.longitude} />
            </div>
        )
    }
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <CurrentCity/>
            </div>
        );
    }
}

export default App;
