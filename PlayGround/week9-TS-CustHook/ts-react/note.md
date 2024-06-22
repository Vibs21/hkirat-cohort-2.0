*cmd to convert ts to js*

# npx tsc -b

*Change the rootDir and outDir in tsconfig.json*

"rootDir": "./src",
"outDir": "./dist"



*ENUM*

# Enums (short for enumerations) in TypeScript are a feature that allows you to define a set of named constants.
# The concept behind an enumeration is to create a human-readable way to represent a set of constant values, which might otherwise be represented as numbers or strings. 


*GENERICS*

1. Problem Statement
Let’s say you have a function that needs to return the first element of an array. Array can be of type either string or integer.

a. What is the problem in this approach?
- User can send different types of values in inputs, without any type errors
- Typescript isn’t able to infer the right type of the return type
2. Solution - Generics 
Generics enable you to create components that work with any data type while still providing compile-time type safety.