import {
  useRecoilValue,
  RecoilRoot,
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValueLoadable,
} from 'recoil';
import {
  jobsAtom,
  messageAtom,
  networkAtom,
  notificationAtom,
  notificationsAtom,
  todoAtomSelectorFamily,
  todosAtomFamily,
  totalNotificationSelector,
  totalNotificationsSelector,
} from './atoms';
import { useEffect } from 'react';
import { Suspense } from 'react';

function App() {
  return (
    <div>
      <RecoilRoot>
        <MainApp />
        <TodoComponent atomId={1} />
        <TodoComponent atomId={2} />

        <TodoComponentAtomSelectorFamily id={1} />
        <TodoComponentAtomSelectorFamily id={2} />
        {/*NOTE: sendong just one request to the Backend for the same parameter */}
        <TodoComponentAtomSelectorFamily id={2} />
        <TodoComponentAtomSelectorFamily id={2} />
        <TodoComponentAtomSelectorFamily id={2} />
      </RecoilRoot>
    </div>
  );
}

function MainApp() {
  useEffect(() => {}, []);

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

function TodoComponent({ atomId }) {
  // suspense and ErrorBoundry Api to show loading while fetching the data

  const fromAtomFamily = useRecoilValue(todosAtomFamily(atomId));
  console.log('fromAtomFamily', fromAtomFamily);
  return (
    <Suspense fallback={"...loading"}>
      <div>
        <h3> sda {fromAtomFamily.title}</h3>
        <h4>{fromAtomFamily.description}</h4>
      </div>
    </Suspense>
  );
}

function TodoComponentAtomSelectorFamily({ id }) {
  // const todoDetails = useRecoilState(todoAtomSelectorFamily(id));

  const [todo, setTodo] = useRecoilStateLoadable(todoAtomSelectorFamily(id));
  // const todo = useRecoilValueLoadable(todoAtomSelectorFamily(id));

  /**
   * NOTE: todo has -> contents -> actualData -> title
   *       todo has -> state -> loading, hasValue, error
   */

  if (todo.state == 'loading') {
    return <p>Loading...</p>;
  } else if (todo.state == 'hasValue') {
    return (
      <div>
        <h3>{todo.contents.title}</h3>
        <h4>{todo.contents.description}</h4>
      </div>
    );
  } else if (todo.state == 'hasError') {
    return(
      <p>Error Occured!</p>
    )
  }
}

export default App;
