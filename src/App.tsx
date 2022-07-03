import { useEffect, useState } from 'react';
import './App.css';
import Wordle from './components/Wordle';
function App() {
    const [soloution, setSolution] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:8000/solutions')
            .then((res) => res.json())
            .then((json) => {
                const randomSoloutin = json[Math.floor(Math.random() * json.length)];
                setSolution(randomSoloutin.word);
            });
    }, [setSolution]);
    return (
        <div className='App'>
            <h1>Wordle (Lingo)</h1>

            {soloution}
            {soloution && <Wordle soloution={soloution} />}
        </div>
    );
}

export default App;
