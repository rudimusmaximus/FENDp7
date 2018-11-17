import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <h1 className="App-header">dfwTips</h1>
                <p className="tempTODO">
                dfwTips by Rudy...comming soon!...
                </p>
                <ol className="tempOl">
                    <li>load the markers using json api and utility functions</li>
                    <li>paint the map</li>
                    <li>paint the search box or selectable filter</li>
                    <li>add the sidebar/menu/collapsable list</li>
                    <li>window popups for markers if not already done load from api</li>
                    <li>parse into components</li>
                    <li>testing</li>
                    <li>activate service worker and test</li>
                    <li>bonus more info form another api like squarspace</li>
                    <li>THORUGHOUT check the rubric checklist in issue 1</li>
                </ol>
                <footer className="footer" id="footer">
                  Copyright (c) 2018 All Rights Reserved.
                </footer>
            </div>
        );
    }
}

export default App;
