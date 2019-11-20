import React, {Component} from 'react';
import WeatherBlock from "./WeatherBlock";
import {connect} from "react-redux";
import {addCity} from "../actions/AddCity";
import {deleteCity} from "../actions/DeleteCity";
import DeleteCity from "./DeleteCity";
import AddCity from "./AddCity";

function mapDispatchToProps(dispatch) {
    return {
        addCity: city => dispatch(addCity(city)),
        deleteCity: city => dispatch(deleteCity(city))
    };
}

function mapStateToProps(state) {
    return {cities: state.cities};
}
/*
class FavouriteCities extends Component{
    constructor(props){
        super(props);
        this.state = {
            cityName : "Surgut",
            latitude : undefined,
            longitude: undefined
        };

        this.addCityButtonPress = this.addCityButtonPress.bind(this);
    }

    addCityButtonPress = (event) => {
        event.preventDefault();
        console.log("new city added");
    };

    render(){
        return(
            <div className="favouriteCities">
                <h1>Избранное</h1>
                <form onSubmit={this.addCityButtonPress}>

                    <button>+</button>
                </form>
                <WeatherBlock cityName={this.state.cityName} latitude={this.state.latitude} longitude={this.state.longitude} />
            </div>
        )
    };
}
*/
class ConnectedFavouriteCities extends React.Component {
    addCity = (cityName) => {
        const timeAdded = Date.now();
        this.props.addCity({
            name: cityName,
            timeAdded: timeAdded
        });
    };

    removeCity = (city) => {
        this.props.deleteCity(city);
    };

    formatCities = (cities) => {
        return cities.map((city) =>
            <li key={city.timeAdded}>
                <WeatherBlock cityName={city.name}/>
                <DeleteCity city={city} removeCity={this.removeCity}/>
            </li>
        );
    };

    render() {
        return (
            <div>
                <ul id="city-grid">{this.formatCities(this.props.cities)}</ul>
                <AddCity addCity={this.addCity}/>
            </div>

        );
    }
}

const FavouriteCities = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedFavouriteCities);


export default FavouriteCities