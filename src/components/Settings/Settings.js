import { useState } from 'react';
import './Settings.css'

const Settings = (props) => {
    const [state, setState] = useState(0);
    const onSubmit = (event) => {
        event.preventDefault();
        props.updateStarSetting(state);
    }

    return (
        <form className="settings" onSubmit={onSubmit}>
            <label>Number of Stars: </label>
            <input
                type='number'
                value={state}
                onChange={event => setState(event.target.value)}
            ></input>
            <br />
            <label>Time Limit: </label>
            <input type='text' placeholder='20 Seconds'></input>
            <br />
            <button>Start Game</button>
        </form>
    );
};

export default Settings;
