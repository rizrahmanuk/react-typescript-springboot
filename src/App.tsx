import React, {HTMLAttributes, useReducer} from 'react';
import logo from './logo.svg';
import './App.css';
import {JSX} from 'react/jsx-runtime';
import {GetOfficers} from "./officer-input";

// Narrow the tags to p, span, h1, etc
type AS = Extract<keyof JSX.IntrinsicElements, 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5'>;

interface Props {
    children: React.ReactNode;
    as: AS;
    key: string;
    // ... other props here
}

export function Text(props: Props) {

    // Render the text with the appropriate HTML tag.
    return (
        <HTMLTag as={props.as}>
            {props.children}
        </HTMLTag>
    );
}

interface HTMLTagProps extends HTMLAttributes<HTMLOrSVGElement> {
    as: AS;
}

function HTMLTag({as: As, ...otherProps}: HTMLTagProps) {
    return <As {...otherProps} />;
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <UpCounter/>
                {/*<Text children={<GetOfficers/>} key={'xxxx'} as={'p'}/>*/}
                {/*<Text as={"h1"} children={ <text> <GetOfficers/> </text>} key={"12345"}/>*/}
            </header>
            <div className="App-content">
                <GetOfficers/>
            </div>
        </div>

    )
}
export default App;

interface State {
    count: number
}

type CounterAction =
    | { type: "reset" }
    | { type: "setCount"; value: State['count'] }

const initialState: State = { count: 0 };

function stateReducer(state: State, action: CounterAction): State {
    switch (action.type) {
        case "reset":
            return initialState;
        case "setCount":
            return { ...state, count: action.value };
        default:
            throw new Error("Unknown action");
    }
}

 function UpCounter() {
    const [state, setState] = useReducer(stateReducer, initialState);

    const addTwo = () => setState({ type: "setCount", value: state.count + 2 });
    const reset = () => setState({ type: "reset" });

    return (
        <div>
            <h1>Welcome to my counter</h1>

            <p>Count: {state.count}</p>
            <button onClick={addTwo}>Add 2</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
}











