import axios from 'axios';
import {atom, selector} from 'recoil';


export const notificationsAtom = atom({
    key: "notifications",
    default: selector({
        key: 'getNotificationsSelector',
        get: async () => {
            // artificial sleep
            await new Promise(resolve => setTimeout(()=> resolve(), 500));
            const res = await axios.get('https://sum-server.100xdevs.com/notifications');
            return res.data;
        }
    })
})

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