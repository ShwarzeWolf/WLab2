import React from 'react';
import {Component} from 'react';

class AddCity extends Component{
    addCity = (event) =>{
        event.preventDefault();
        this.props.addCity(event.target[0].value);
    };

    render() {
        return(
            <div className="addCityForm">
                <form onSubmit={this.addCity}>
                    <input type="text" placeholder="Добавьте новый город"></input>
                    <button className="addCityButton">+</button>
                </form>
            </div>
        );
    }
}

export default AddCity
