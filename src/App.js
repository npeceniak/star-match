import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Instructions from './components/Instructions/Instructions';
import Gameboard from './components/Gameboard/Gameboard';
import Settings from './components/Settings/Settings';
import * as utils from './utils/math'

function App() {
    const [numStars, setNumStars] = useState(0);
    const [availableNums, setAvailableNums] = useState(utils.range(1, numStars));
    // const [availableNums, setAvailableNums] = useState([1,2,3]);
    const [candidateNums, setCanditateNums] = useState([]);

    return (
        <div className="App">
            <Header />
            <Instructions />
            <Settings updateStarSetting={(input) => { 
                setNumStars(input) 
                setAvailableNums(utils.range(1, input))
                }} />
            <Gameboard availableNums={availableNums} candidateNums={candidateNums} />
        </div>
    );
}

export default App;
