import { memo, useCallback } from 'react';
import { useState } from "react";

// Create a counter component with increment and decrement functions. Pass these functions to a child component which has buttons to perform the increment and decrement actions. Use useCallback to ensure that these functions are not recreated on every render.

export function Assignment1() {
    const [count, setCount] = useState(0);

    // Your code starts here
    const handleIncrement = useCallback(function () {
        console.log('increment');
        setCount(c => ++c);
    }, [])

    const handleDecrement = useCallback(function () {
        console.log('decrement')
        /*
        * NOTE: 
        * as it's doing it's calculation here itself using the current value of the state variable, we don't need to put it in
        * the depedency array, if the state value is been used to do something  in this callback then it should be added as a depedency,
        * like in assignement 2
        */
        setCount(c => --c);
    }, [])
    // Your code ends here

    return (
        <div>
            <p>Count: {count}</p>
            <CounterButtons onIncrement={handleIncrement} onDecrement={handleDecrement} />
        </div>
    );
};

const CounterButtons = memo(({ onIncrement, onDecrement }) => (
    <div>
        <button onClick={onIncrement}>Increment</button>
        <button onClick={onDecrement}>Decrement</button>
    </div>
));
