import React, {Component} from 'react';
import '../styles/weatherBlock.css'

class WeatherBlock extends Component {
    state = {
        weatherData: undefined,
        isLoading: false,
        errorOccurred: false,
        errorMessage: undefined,
        cityName: undefined,
        latitude: undefined,
        longitude: undefined
    };

    formRequest(city, longitude, latitude){
        if (!!city)
            return "http://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&appid=f51bcfb8b207b0ef58ce10da80b90477";

        if (!!latitude && !!longitude)
            return "http://api.openweathermap.org/data/2.5/weather?lon=" +
                longitude + "&lat=" + latitude +
                "&appid=f51bcfb8b207b0ef58ce10da80b90477";

        return null;
    }

    getWeatherData = async(city, longitude, latitude) => {
        this.setState({isLoading: true});

        const URL = await this.formRequest(city, longitude, latitude);

        await fetch(URL)
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

        this.setState({isLoading : false});
    };

    componentDidMount() {
        this.getWeatherData(this.props.cityName, this.props.longitude, this.props.latitude);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.cityName !== this.props.cityName ||
            prevProps.longitude !== this.props.longitude ||
            prevProps.latitude !== this.props.latitude) {
            this.getWeatherData(this.props.cityName, this.props.longitude, this.props.latitude);
        }
    }

    render() {
        const weatherData = this.state.weatherData;

        if (this.state.isLoading)
            return(<div>Подождите, данные загружаются</div>);

        if (!weatherData)
            if (this.state.errorOccurred)
                return(
                    <div className="errorBlock">
                        <div>Что-то пошло не так. Причина:</div>
                        <div>{this.state.errorMessage}</div>
                    </div>
                );
            else
                return null;

        const iconUrl = "http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png";

        return (
            <div className="weatherInfo">
                <div className="weatherMain">{weatherData.name} <img src={iconUrl} alt={weatherData.description} /></div>
                <div className="weatherSpecified">
                    <div className="weatherLine">Температура: {(weatherData.main.temp - 273.15).toFixed(2)}°</div>
                    <div className="weatherLine">Ветер: {weatherData.wind.speed}</div>
                    <div className="weatherLine">Облачность: {weatherData.clouds.all}</div>
                    <div className="weatherLine">Давление: {weatherData.main.pressure}</div>
                    <div className="weatherLine">Влажность: {weatherData.main.humidity} </div>
                    <div className="weatherLine">Координаты: [{weatherData.coord.lon} {weatherData.coord.lat}]</div>
                </div>
            </div>
        );
    }
}

export default WeatherBlock