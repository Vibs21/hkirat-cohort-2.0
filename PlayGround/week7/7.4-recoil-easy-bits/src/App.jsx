import { useRecoilValue, RecoilRoot } from "recoil";
import { jobsAtom, messageAtom, networkAtom, notificationAtom, notificationsAtom, todosAtomFamily, totalNotificationSelector, totalNotificationsSelector } from './atoms';
import { useEffect } from 'react';

function App() {


  return (
    <div>
      <RecoilRoot>
        <MainApp/>
        <TodoComponent atomId={1}/>
        <TodoComponent atomId={2}/>
      </RecoilRoot>
    </div>
  )


}

function MainApp() {


  useEffect(()=> {

  }, [])

  const networkNotificationCount = useRecoilValue(networkAtom);
  const jobsNotificationCount = useRecoilValue(jobsAtom);
  const messageNotificationCount = useRecoilValue(messageAtom);
  const notificationCount = useRecoilValue(notificationAtom);

  const totalNotifications = useRecoilValue(totalNotificationsSelector);
  

  const notifications = useRecoilValue(notificationsAtom);


  console.log('not', notifications);

  return (
    <>
      <button>Home</button>

      <button>My Network ({notifications.network})</button>
      <button>Jobs ({notifications.jobs})</button>
      <button>Messaging ({notifications.messaging})</button>
      <button>Notifications ({notifications.notifications})</button>

      <button>Me ({totalNotifications})</button>

      
    </>
  );
}

function TodoComponent({atomId}) {

  const fromAtomFamily = useRecoilValue(todosAtomFamily(atomId));
  console.log('fromAtomFamily', fromAtomFamily)
  return(
    <div>
      <h3> sda {fromAtomFamily.title}</h3>
      <h4>{fromAtomFamily.description}</h4>
    </div>
  )
}

export default App;
