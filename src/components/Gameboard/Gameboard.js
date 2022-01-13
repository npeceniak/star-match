import './Gameboard.css';
import * as utils from '../../utils/math'
import { useState, useEffect } from 'react';

const StarsDisplay = props => (
    <>
        {utils.range(1, props.count).map(starId => (
            <div key={starId} className="star" />
        ))}
    </>
);

const PlayNumber = (props) => (
    <button
        className='number'
        style={{ backgroundColor: utils.colors[props.status] }}
        onClick={() => { props.onClick(props.number, props.status); }}
    >
        {props.number}
    </ button>
)

const PlayAgain = (props) => (
    <div className='game-done'>
        <div className='message'>
            {
                props.gameStatus === 'won' ? "You Won!" : "Times Up"
            }
        </div>
        <button onClick={props.onClick}>Play Again?</button>
    </div>
)

const LeftBox = (props) => {
    if(props.gameStatus !== "running"){
        return (<PlayAgain onClick={props.onClick} gameStatus={props.gameStatus} />)
    }
    return (<StarsDisplay count={props.stars} />)
};


const Gameboard = () => {
    const [stars, setStars] = useState(utils.random(1, 9));
    const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
    const [candidateNums, setCandidateNums] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState([10]);

    // Runs every time the component renders.
    useEffect(() => {
        if(secondsLeft > 0 && availableNums.length > 0){
            const timerId = setTimeout(() => { setSecondsLeft(secondsLeft - 1) }, 1000);
            return () => {clearTimeout(timerId)}
        }
    });

    const candidatesAreWrong = utils.sum(candidateNums) > stars;
    // TODO: Use function to compute game status instead of nested ternary
    const gameStatus = availableNums.length === 0 ? 'won' : secondsLeft > 0 ? 'running' :'lost';

    const numberStatus = number => {
        if (!availableNums.includes(number)) {
            return 'used';
        }
        if (candidateNums.includes(number)) {
            return candidatesAreWrong ? 'wrong' : 'candidate';
        }
        return 'available';
    };

    const onNumberClick = (number, currentStatus) => {
        if (currentStatus === 'used' || gameStatus !== 'running') {
            return;
        }

        const newCandidateNums =
            currentStatus === 'available'
                ? candidateNums.concat(number)
                : candidateNums.filter(cn => cn !== number);

        if (utils.sum(newCandidateNums) !== stars) {
            setCandidateNums(newCandidateNums);
        } else {
            const newAvailableNums = availableNums.filter(
                n => !newCandidateNums.includes(n)
            );
            setStars(utils.randomSumIn(newAvailableNums, 9));
            console.log(availableNums);
            setAvailableNums(newAvailableNums);
            setCandidateNums([]);
        }
    };

    const resetGame = () => {
        setStars(utils.random(1, 9));
        setAvailableNums(utils.range(1, 9));
        setCandidateNums([]);
        setSecondsLeft(10);
    }


    return (
        <div>
            <div id='gameboard'>
                <div className='left'>
                    <LeftBox gameStatus={gameStatus} stars={stars} onClick={resetGame} />
                </div>
                <div className='right'>
                    {utils.range(1, 9).map(number => (
                        <PlayNumber
                            key={number}
                            status={numberStatus(number)}
                            number={number}
                            onClick={onNumberClick}
                        />
                    ))}
                </div>
            </div>
            <div className='timer'>
                Time Remaining: {secondsLeft}
            </div>
        </div>
    );
};

export default Gameboard;