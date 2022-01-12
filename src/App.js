// import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Instructions from './components/Instructions/Instructions';
import Gameboard from './components/Gameboard/Gameboard';
// import Settings from './components/Settings/Settings';
// import * as utils from './utils/math'

function App() {


    return (
        <div className="App">
            <Header />
            <Instructions />
            {/* <Settings updateStarSetting={(input) => {
                setNumStars(input)
                setAvailableNums(utils.range(1, input))
            }} /> */}
            <Gameboard />
        </div>
    );
}

export default App;
