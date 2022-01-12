import './Gameboard.css';
import * as utils from '../../utils/math'

const StarsDisplay = (props) => {
    return (
        <>
            {utils.range(1, props.numStars).map(id => <div key={id} className='star'></ div>)}
        </>
    )
}

const NumberDisplay = (props) => {
    return (
        <>
            {utils.range(1, props.numStars).map(id => <button key={id} className='number'>{id}</ button>)}
        </>
    )
}

const Gameboard = (props) => {
    return (
        <div id='gameboard'>
            <div className='left'>
                <StarsDisplay numStars={props.numStars} />
            </div>
            <div className='right'>
                <NumberDisplay numStars={props.numStars} />
            </div>
        </div>
    );
};

export default Gameboard;