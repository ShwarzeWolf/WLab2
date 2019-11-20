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
            <li key={city.timeAdded}>
                <WeatherBlock cityName={city.name}/>
                <RemoveCity city={city} removeCity={this.removeCity}/>
            </li>
        );
    };

    render() {
        return (
            <div className="favouriteCities">
                <h1>Избранное</h1>
                <ul className="favouriteCity">{
                    this.formatCities(this.props.cities)
                }</ul>
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