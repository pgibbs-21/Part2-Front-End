import { useState } from 'react';

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.',
    ];

    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
    console.log(votes);

    const toggleAnecdotes = () => {
        if (selected >= anecdotes.length - 1) {
            setSelected(0);
        } else {
            setSelected(selected + 1);
        }
    };

    const countVotes = () => {
        const newVotes = [...votes];
        newVotes[selected] += 1;
        setVotes(newVotes);
    };

    const maxVote = () => {
        let maxVoteIndex = -1;
        let maxVoteValue = 0;
        for (let i = 0; i < votes.length; i++) {
            if (votes[i] > maxVoteValue) {
                maxVoteValue = votes[i];
                maxVoteIndex = i;
            }
        }
        return maxVoteIndex
    };

    const maxVoteResultIndex = maxVote()
    console.log(maxVoteResultIndex)

    return (
        <div>
            <div>
                <h1>Anecdote of the Day</h1>
                <p>
                    {selected + 1}. {anecdotes[selected]}
                </p>
                <p>has {votes[selected]} votes</p>
            </div>
            <div>
                <button onClick={toggleAnecdotes}>Next Anecdote</button>
                <button onClick={countVotes}>Vote</button>
            </div>
            <div>
                <h2>Anecdote with most votes</h2>
                <p>{anecdotes[maxVoteResultIndex]}</p>
                <p>has {votes[maxVoteResultIndex]} votes</p>
            </div>
        </div>
    );
};

export default App;
