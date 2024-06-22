const x: number = 101;
console.log(x);

const greet = (firstName: string) => {
  console.log('hello ' + firstName);
};

greet('Vaibhav');

//type inference, the intelenge of TS which tells by looking at thr argument what can be the return type of the function automatically
//NOTE: last ':number' tell about the return type of the function
const sum = (a: number, b: number): number => {
  return a + b;
};

//create a func that takes fucn as an input and run it after 1 sec

function a() {
  console.log('hello from small function');
}

//NOTE: the code "(func: () => void)" tells that the argument is a fucntion which returns nothing, hence void
function higherOrderFunc(func: () => void) {
  setTimeout(func, 1000);
}

//NOTE: the 1st argument is the complete defination of the function, which we want to pass as a
// argument, func is the name of the function and after color (:) is the defination of the
// function
function higherOrderNumFunc(
  func: (a: number, b: number) => number,
  a: number,
  b: number
) {
  return func(a, b);
}

higherOrderFunc(a);
let sumNum = higherOrderNumFunc(sum, 5, 9);
console.log('the sum from sumNum is: ', sumNum);

/////////////////////////////////////////////////////////////////////

interface Animal {
  makeSound(): void;
}

interface Pet extends Animal {
  play(): void;
}

class Dog implements Pet {
  makeSound() {
    console.log('Bark');
  }

  play() {
    console.log('Playing fetch');
  }
}

const myDog = new Dog();
myDog.makeSound(); // Output: Bark
myDog.play(); // Output: Playing fetch
