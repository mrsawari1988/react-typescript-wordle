import { useState } from 'react';
import { guessType, guessTypeArray } from '../types';

const useWordle = (solution: string) => {
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState<guessTypeArray[]>([...Array(6)]); // each guess is an array
    const [history, setHistory] = useState(['hello', 'ninja']); // each guess is a string
    const [isCorrect, setIsCorrect] = useState(false);

    // format a guess into an array of letter objects
    // e.g. [{key: 'a', color: 'yellow'}]
    const formatGuess = () => {
        // let soloutionArray = [...solution];
        let soloutionArray: (string | null)[] = Array.from(solution);
        // let formattedGuess = [...currentGuess].map((char) => {
        //     return { key: char, color: 'grey' };
        // });
        let formattedGuess = Array.from(currentGuess).map((char) => {
            return { key: char, color: 'grey' };
        });
        // find any green letters
        formattedGuess.forEach((charObj, index) => {
            if (charObj.key === solution[index]) {
                formattedGuess[index].color = 'green';
                soloutionArray[index] = null;
            }
        });
        // find any yellow letters
        formattedGuess.forEach((charObj, index) => {
            if (soloutionArray.includes(charObj.key) && charObj.color !== 'green') {
                formattedGuess[index].color = 'yellow';
                soloutionArray[soloutionArray.indexOf(charObj.key)] = null;
            }
        });

        return formattedGuess;
    };

    // add a new guess to the guesses state
    // update the isCorrect state if the guess is correct
    // add one to the turn state
    const addNewGuess = (formatted: guessTypeArray) => {
        if (currentGuess === solution) {
            setIsCorrect(true);
            // setGuesses([...Array(6)]);
            // setTurn(0);
            // setCurrentGuess('');
        }
        setGuesses((prevGusses) => {
            // let newGusses = [...prevGusses];
            let newGusses = Array.from(prevGusses);
            newGusses[turn] = formatted;
            return newGusses;
        });
        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess];
        });
        setTurn((prevTurn) => {
            return prevTurn + 1;
        });
        setCurrentGuess('');
    };

    // handle keyup event & track current guess
    // if user presses enter, add the new guess
    const handleKeyup = ({ key }: { key: string }) => {
        // i wrote this part
        if (isCorrect) {
            return;
        }
        if (key === 'Enter') {
            // only add guess if turn is less than 5
            if (turn > 5) {
                console.log('you have finished your turns');
                return;
            }
            // do not allow duplicate words
            if (history.includes(currentGuess)) {
                console.log('you already tried that word.');
                return;
            }
            // check word is 5 chars
            if (currentGuess.length < 5) {
                console.log('word must be 5 chars.');
                return;
            }
            const formatted = formatGuess();
            addNewGuess(formatted);
        }
        if (key === 'Backspace') {
            setCurrentGuess((prev) => {
                return prev.slice(0, -1);
            });
        }

        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess((prev) => {
                    return prev + key;
                });
            }
        }
    };

    return { turn, currentGuess, guesses, isCorrect, handleKeyup };
};
export default useWordle;
