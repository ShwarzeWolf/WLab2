import React from 'react';
class AddCity extends React.Component{

    state = {
        city: undefined
    }

    addCity = (e) =>{
        e.preventDefault();
        console.log("dobavlyayem gorod ", e.target[0].value);
        this.props.addCity(e.target[0].value);
    }

    render() {
        return(
            <div>
                <form onSubmit={this.addCity}>
                    <input></input>
                    <button>add city</button>
                </form>
            </div>
        );
    }

}
export default AddCity
