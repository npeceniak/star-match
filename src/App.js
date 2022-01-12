import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Instructions from './components/Instructions/Instructions';
import Gameboard from './components/Gameboard/Gameboard';
import Settings from './components/Settings/Settings';

function App() {
    const [numStars, setNumStars] = useState();

    return (
        <div className="App">
            <Header />
            <Instructions />
            <Settings updateStarSetting={(input) => setNumStars(input)}/>
            <Gameboard numStars={numStars}/>
        </div>
    );
}

export default App;
