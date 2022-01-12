import './Gameboard.css';
import * as utils from '../../utils/math'
import { useState } from 'react';

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
    <div>
        <button>Play Again?</button>
    </div>
)


const Gameboard = () => {
    const [stars, setStars] = useState(utils.random(1, 9));
    const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
    const [candidateNums, setCandidateNums] = useState([]);

    const candidatesAreWrong = utils.sum(candidateNums) > stars;
    const gameOver = availableNums.length === 0;

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
        if (currentStatus === 'used') {
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


    return (
        <div id='gameboard'>
            <div className='left'>
                {
                    gameOver ? (<PlayAgain />) : (<StarsDisplay count={stars} />)
                }
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
    );
};

export default Gameboard;