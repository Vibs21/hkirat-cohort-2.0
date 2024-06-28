interface User {
  name: string;
  age: number;
}


const sumOfAge = (user1: User, user2: User) => {
    return user1.age + user2.age;
}


const age = sumOfAge({'name': 'test1', 'age': 15}, {'name': 'test2', 'age': 18});
console.log('age is :', age);