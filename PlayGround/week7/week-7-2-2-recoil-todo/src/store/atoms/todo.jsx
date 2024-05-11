import {atom, selector} from 'recoil';


export const todoListAtom = atom({
    key: 'todoListAtom',
    default: [{
        title: 'Goto Gym',
        isDone: false
    },
    {
        title: 'Study Recoil',
        isDone: false
    },
    {
        title: 'Prepare Notes',
        isDone: false
    }]
})

export const todoInputAtom = atom({
    key: 'todoInputAtom',
    default: ''
})


//NOTE: It's a thing which depends on other (state variables) i.e. atoms and all but use them to derive something out of them,
// and then we need to use it
export const filteredTodoSelector = selector({
    key: "filteredTodoSelector",
    get: ({get}) => {
        const todoList = get(todoListAtom);
        const userInput = get(todoInputAtom);

        let filteredData = todoList.filter((val)=> {
            return val.title.toLowerCase().includes(userInput.toLowerCase());
        })
        return filteredData;
   }
})