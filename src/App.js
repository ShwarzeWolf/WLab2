import React, {Component} from 'react';
import './App.css';
import CurrentCity from './components/CurrentCity'

class App extends Component {
    render() {
        return (
            <div className="App">
                <CurrentCity/>
            </div>
        );
    }
}

export default App;
