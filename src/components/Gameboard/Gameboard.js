import './Gameboard.css';
import * as utils from '../../utils/math'

const StarsDisplay = (props) => {
    return (
        <>
            {utils.range(1, props.numStars).map(id => <div key={id} className='star'></ div>)}
        </>
    )
}

const PlayNumber = (props) => {
    return (
        <button key={props.id} className='number'>{props.id}</ button>
    )
}

const Gameboard = (props) => {
    console.log(props);
    const numStars = props.availableNums.length;
    return (
        <div id='gameboard'>
            <div className='left'>
                <StarsDisplay numStars={numStars} />
            </div>
            <div className='right'>
                {
                    props.availableNums.map(num => {
                        return (<PlayNumber id={num}/>)
                    })
                }
            </div>
        </div>
    );
};

export default Gameboard;