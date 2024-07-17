import { useState } from 'react';

const StatisticsLine = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    );
};

const Statistics = ({ good, neutral, bad }) => {
    const allClicks = good + bad + neutral;

    if (allClicks === 0) {
        return <p>Press any Button above to start receiving Feedback</p>;
    }

    return (
        <div>
            <table>
                <tbody>
                    <StatisticsLine text='good' value={good} />
                    <StatisticsLine text='neutral' value={neutral} />
                    <StatisticsLine text='bad' value={bad} />
                    <StatisticsLine text='all' value={allClicks} />
                    <StatisticsLine
                        text='average'
                        value={(good + bad * -1) / allClicks}
                    />
                    <StatisticsLine
                        text='positive'
                        value={(good / allClicks) * 100}
                    />
                </tbody>
            </table>
        </div>
    );
};

const Button = ({ clickHandler, text }) => {
    return <button onClick={clickHandler}>{text} </button>;
};

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const [allClicks, setAll] = useState(0);

    const goodIncrease = () => {
        setGood(good + 1);
        setAll(good + 1 + neutral + bad);
    };

    const neutralIncrease = () => {
        setNeutral(neutral + 1);
        setAll(good + (neutral + 1) + bad);
    };

    const badIncrease = () => {
        setBad(bad + 1);
        setAll(good + neutral + (bad + 1));
    };

    const reset = () => {
        setGood(0);
        setNeutral(0);
        setBad(0);
        setAll(0);
    };

    return (
        <div>
            <h1>Give Feedback</h1>
            <div>
                <Button clickHandler={goodIncrease} text='good' />
                <Button clickHandler={neutralIncrease} text='neutral' />
                <Button clickHandler={badIncrease} text='bad' />
            </div>

            <div>
                <h2>Statistics</h2>
                <Statistics good={good} neutral={neutral} bad={bad} />
            </div>
            <div>
                <Button clickHandler={reset} text="reset" />
            </div>
        </div>
    );
};

export default App;
