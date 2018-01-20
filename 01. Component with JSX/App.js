import React, { Component } from 'react';
import Product from './Product';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Product />
                <Product />
                <Product />
            </div>
        );
    }
}

export default App;
