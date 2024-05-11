import { useRecoilValue, RecoilRoot } from "recoil";
import { jobsAtom, messageAtom, networkAtom, notificationAtom, notificationsAtom, totalNotificationSelector } from './atoms';

function App() {


  return (
    <div>
      <RecoilRoot>
        <MainApp/>
      </RecoilRoot>
    </div>
  )


}

function MainApp() {

  const networkNotificationCount = useRecoilValue(networkAtom);
  const jobsNotificationCount = useRecoilValue(jobsAtom);
  const messageNotificationCount = useRecoilValue(messageAtom);
  const notificationCount = useRecoilValue(notificationAtom);

  const totalNotifications = useRecoilValue(totalNotificationSelector);

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

function button() {

  return(
    <button>

    </button>
  )
}

export default App;
