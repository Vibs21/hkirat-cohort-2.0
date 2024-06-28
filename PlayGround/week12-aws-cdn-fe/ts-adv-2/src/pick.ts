
interface UserDetails {
    id: number;
    name: string;
    age: number;
    email: string,
    password: string;
    createdAt: Date
}

//pick let you pick some properties out of interface or type and create a type

type UserProfile = Pick<UserDetails, 'name' | 'email'>;

const displayUserDetails = (user: UserProfile) => {
    console.log(user.name, user.email);
}

displayUserDetails({'name': 'Shyam', 'email': 'shyam@radha.com'})