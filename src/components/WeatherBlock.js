import React, {Component} from 'react';

class WeatherBlock extends Component {
    state = {
        weatherData: undefined,
        errorOccurred: false,
        errorMessage: undefined,
        cityName: undefined,
        latitude: undefined,
        longitude: undefined
    };

    formRequest(city, longitude, latitude){

        console.log(this.state);
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
        const URL = await this.formRequest(city, longitude, latitude);

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
            <div className="weatherInfo">
                <h2>{weatherData.name} <img src={iconUrl} alt={weatherData.description} /></h2>
                <p>Температура: {(weatherData.main.temp - 273.15).toFixed(2)}°</p>
                <p>Ветер: {weatherData.wind.speed}</p>
                <p>Облачность: {weatherData.clouds.all}</p>
                <p>Давление: {weatherData.main.pressure}</p>
                <p>Влажность: {weatherData.main.humidity} </p>
                <p>Координаты: [{weatherData.coord.lon} {weatherData.coord.lat}]</p>
            </div>
        );
    }
}

export default WeatherBlock