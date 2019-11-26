import React, {Component} from 'react';
import WeatherBlock from "./WeatherBlock";

class CurrentCity extends Component{
    constructor(props){
        super(props);
        this.state = {
            cityName : "Surgut",
            latitude : undefined,
            longitude: undefined
        };

        this.getLocationButtonPress = this.getLocationButtonPress.bind(this);
    }

    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    cityName: undefined
                });
            }));
        } else {
            this.setState({
                latitude: undefined,
                longitude: undefined,
                cityName: "Surgut"
            });
        }
    };

    getLocationButtonPress = (event) => {
        event.preventDefault();
        this.getLocation()
    };

    render(){
        navigator.geolocation.getCurrentPosition(function(){});

        return(
            <div className="currentCity">
                <h1>Погода здесь</h1>
                    <form className="updateGeoLocation" onSubmit={this.getLocationButtonPress}>
                        <button>Обновить геолокацию</button>
                    </form>
                <WeatherBlock cityName={this.state.cityName} latitude={this.state.latitude} longitude={this.state.longitude} />
            </div>
        )
    };
}

export default CurrentCity