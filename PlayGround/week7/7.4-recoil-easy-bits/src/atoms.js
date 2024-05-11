import axios from 'axios';
import {atom, selector, atomFamily} from 'recoil';
import { TODOS } from './todos';


export const todosAtomFamily = atomFamily({
    key: "todosAtomFamily",
    default: id => {
        let foundTodo = null;
        foundTodo = TODOS.find((val)=> val.id == id)
        return foundTodo;
    }
})


// asnyc queries via selectos in the atom

export const notificationsAtom = atom({
    key: "notifications",
    default: selector({
        key: 'getNotificationsSelector',
        get: async ({get}) => {
            // artificial sleep
            await new Promise(resolve => setTimeout(()=> resolve(), 500));
            const res = await axios.get('https://sum-server.100xdevs.com/notifications');
            return res.data;
        }
    })
})

export const totalNotificationsSelector = selector({
    key: "totalNotificationsSelector",
    get: ({get}) => {
        const notifications = get(notificationsAtom);
        return notifications.network + notifications.jobs + notifications.messaging + notifications.notifications
    }
})

/** Individual atoms create for single use */

export const networkAtom = atom({
    key: 'networkAtom',
    default: 109
})

export const jobsAtom = atom({
    key: 'jobsAtom',
    default: 10
})

export const messageAtom = atom({
    key: 'messageAtom',
    default: 25
})

export const notificationAtom = atom({
    key: 'notificationAtom',
    default: 0
})


export const totalNotificationSelector = selector({
    key: "totalNotificationSelector",
    get: ({get}) => {
        return get(notificationAtom) + get(messageAtom) + get(jobsAtom) + get(networkAtom);
    }
})



//atomfamily, caches the value and does re redernser o=for same entry