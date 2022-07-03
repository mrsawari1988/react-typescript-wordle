import React, { useEffect } from 'react';
import Row from './Row';
import { guessType, guessTypeArray } from '../types';
type gridProps = {
    currentGuess: string;
    guesses: guessTypeArray[];
    turn: number;
};
export default function Grid({ currentGuess, guesses, turn }: gridProps) {
    return (
        <div>
            {guesses.map((guess, index) => {
                if (turn === index) {
                    return <Row key={index} currentGuess={currentGuess} />;
                }
                return <Row key={index} guess={guess} />;
            })}
        </div>
    );
}
