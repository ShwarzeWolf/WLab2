import React, {Component} from 'react';
import './App.css';


class WeatherBlock extends Component {
    constructor() {
        super();
        this.state = {
            weatherData: null
        };
    }

    componentDidMount() {
        const name = this.props.name;
        const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
            name +
            "&appid=f51bcfb8b207b0ef58ce10da80b90477";

        fetch(URL)
            .then(res => res.json())
            .then(json => {
            this.setState({ weatherData: json });
        });
    }

    render() {
        const weatherData = this.state.weatherData;

        if (!weatherData)
            return(<div>Подождите, данные загружаются</div>);

        //return JSON.stringify(weatherData);
        const weather = weatherData.weather[0];
        const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";

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
    render(){
        return(
            <div className="currentCity">
                <WeatherBlock name={"Surgut"} />
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
