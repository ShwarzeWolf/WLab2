import React, {Component} from 'react';
import {connect} from "react-redux";
import WeatherBlock from "./WeatherBlock";
import RemoveCity from "./RemoveCity";
import AddCity from "./AddCity";
import {addCity, removeCity} from "../actions/actions"

const mapDispatchToProps = (dispatch) => {
    return {
        addCity: city => dispatch(addCity(city)),
        removeCity: city => dispatch(removeCity(city))
    };
};

const mapStateToProps = (state) => {
    return {cities: state.cities};
};

class ConnectedFavouriteCities extends Component {
    state = {
        ID : 0
    };

    addCity = (cityName) => {
        this.props.addCity({
            name: cityName,
            id: this.state.ID
        });

        let currentID = this.state.ID + 1;
        this.setState({ID: currentID});
    };

    removeCity = (city) => {
        this.props.removeCity(city);
    };

    formatCities = (cities) => {

        return cities.map((city) =>
            <div className="weatherItem"
                key={city.id}>
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