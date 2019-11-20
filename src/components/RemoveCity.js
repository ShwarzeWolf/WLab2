import React from 'react';
import {Component} from 'react';

class RemoveCity extends Component{
    removeCity = () => {
        this.props.removeCity(this.props.city);
    };

    render() {
        return(
            <div className="removeCityForm">
                <button className="removeCityButton" onClick={this.removeCity}>X</button>
            </div>
        );
    }
}

export default RemoveCity
