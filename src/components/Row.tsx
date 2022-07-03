import React from 'react';
import { guessType, guessTypeArray } from '../types';
type rowProps = {
    guess?: guessTypeArray;
    currentGuess?: string;
};
export default function Row({ guess, currentGuess }: rowProps) {
    if (guess) {
        return (
            <div className='row past'>
                {guess.map((charObj, index) => {
                    return (
                        <div key={index} className={charObj.color}>
                            {charObj.key}
                        </div>
                    );
                })}
            </div>
        );
    }

    if (currentGuess) {
        const lettersArray = currentGuess.split('');
        return (
            <div className='row current'>
                {lettersArray.map((letter, index) => (
                    <div key={index}>{letter}</div>
                ))}
                {[...Array(5 - lettersArray.length)].map((value, index) => (
                    <div key={index}></div>
                ))}
            </div>
        );
    }

    return (
        <div className='row'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}
