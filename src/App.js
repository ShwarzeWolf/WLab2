import React, {Component} from 'react';
import CurrentCity from './components/CurrentCity'
import FavouriteCities from './components/FavouriteCities'

class App extends Component {
    render() {
        return (
            <div className="App">
                <CurrentCity/>
                <FavouriteCities/>
            </div>
        );
    }
}

export default App;
