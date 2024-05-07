
import React, { createContext, useContext, useState } from 'react';

// Create a context with default values
const MyContext = createContext({
  value1: '',
  value2: '',
  setValue1: () => {},
  setValue2: () => {},
});

// Create a provider component
function MyProvider({ children }) {
  // Define state variables for the context values
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');

  // Create an object containing the context values and update functions
  const contextValues = {
    value1,
    value2,
    setValue1,
    setValue2,
  };

  // Pass the object as the value prop to the Provider
  return <MyContext.Provider value={contextValues}>{children}</MyContext.Provider>;
}

// Create a custom hook to consume the context values
function useMyContext() {
  return useContext(MyContext);
}

// Example usage of the context values and update functions
function MyComponent() {
  // Use the custom hook to access the context values and update functions
  const { value1, value2, setValue1, setValue2 } = useMyContext();

  const handleUpdateValue1 = () => {
    setValue1('New Value 1');
  };

  const handleUpdateValue2 = () => {
    setValue2('New Value 2');
  };

  return (
    <div>
      <p>Value 1: {value1}</p>
      <button onClick={handleUpdateValue1}>Update Value 1</button>
      <p>Value 2: {value2}</p>
      <button onClick={handleUpdateValue2}>Update Value 2</button>
    </div>
  );
}

// In your App component, wrap the components that need access to the context with the Provider
function App2() {
  return (
    <MyProvider>
      <MyComponent />
    </MyProvider>
  );
}

export default App2;
