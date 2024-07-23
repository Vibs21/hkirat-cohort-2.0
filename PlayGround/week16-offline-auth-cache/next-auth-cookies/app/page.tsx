import Image from "next/image";
import { Appbar } from '../components/Appbar';
import ServerComponent from './User/page';

export default function Home() {
  return (
    <div>
     from client <Appbar/>

<br/>
      from server: <ServerComponent/>

    </div>
  );
}
