import useWordle from '../hooks/useWordle';
import { useEffect } from 'react';
import Grid from './Grid';
type wordleProps = {
    soloution: string;
};
const Wordle = ({ soloution }: wordleProps) => {
    const { currentGuess, handleKeyup, guesses, isCorrect, turn } = useWordle(soloution);

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup);
        return () => window.removeEventListener('keyup', handleKeyup);
    }, [handleKeyup]);

    // useEffect(() => {
    //     console.log(guesses, turn, isCorrect);
    // }, [guesses, isCorrect, turn]);
    return (
        <div>
            <div>soloution : {soloution}</div>
            <div>current guess : {currentGuess}</div>
            <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
        </div>
    );
};

export default Wordle;
