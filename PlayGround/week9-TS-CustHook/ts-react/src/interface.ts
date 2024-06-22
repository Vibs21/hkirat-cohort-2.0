//NOTE: To assign a type to the user object, you can use interfaces


interface User {
    name: string,
    lastName: string,
    age: number,
    email?: string
}

function isLegal(user: User) {
    if(user.age >= 18) {
        console.log('Bacha balik Hai!');
    } else {
        console.log('Bacha balik nai Hai! ', user.email);
    }
}

isLegal({
    name: "Shyam",
    lastName: "Kumar",
    age:19
});

isLegal({
    name: "Kiran",
    lastName: "Kumari",
    age:17,
    email: "Kiran@gmail.com"
});

// class Student implements User {

// }