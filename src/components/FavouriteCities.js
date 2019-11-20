import React, {Component} from 'react';
import {connect} from "react-redux";
import WeatherBlock from "./WeatherBlock";
import RemoveCity from "./RemoveCity";
import AddCity from "./AddCity";
import {addCity} from "../actions/AddCity";
import {removeCity} from "../actions/RemoveCity";

function mapDispatchToProps(dispatch) {
    return {
        addCity: city => dispatch(addCity(city)),
        removeCity: city => dispatch(removeCity(city))
    };
}

function mapStateToProps(state) {
    return {cities: state.cities};
}

class ConnectedFavouriteCities extends Component {
    addCity = (cityName) => {
        const timeAdded = Date.now();
        this.props.addCity({
            name: cityName,
            timeAdded: timeAdded
        });
    };

    removeCity = (city) => {
        this.props.removeCity(city);
    };

    formatCities = (cities) => {
        return cities.map((city) =>
            <div className="weatherItem"
                 key={city.timeAdded}>
                <RemoveCity city={city} removeCity={this.removeCity}/>
                <WeatherBlock cityName={city.name}/>
            </div>
        );
    };

    render() {
        return (
            <div className="favouriteCities">
                <h1 className="blockHeader">Избранное </h1>
                <AddCity addCity={this.addCity}/>
                <div className="favouriteCity">{
                    this.formatCities(this.props.cities)
                }</div>
            </div>
        );
    }
}

const FavouriteCities = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedFavouriteCities);

export default FavouriteCities