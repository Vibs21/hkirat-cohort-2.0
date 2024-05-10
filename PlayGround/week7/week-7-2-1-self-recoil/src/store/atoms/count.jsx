import {atom, selector} from 'recoil';


export const countAtom = atom({
    key: 'countAtom',
    default: 0
})


//NOTE: It's a thing which depends on other (state variables) i.e. atoms and all but use them to derive something out of them,
// and then we need to use it
export const countSelector = selector({
    key: "CountSelector",
    get: ({get}) => { //props => props.get // without curly braces
        const count = get(countAtom);
        return count % 2;
    }
})