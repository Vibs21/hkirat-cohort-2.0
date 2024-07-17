import Image from "next/image";
import { Button } from "@repo/ui/button";
import { Admin } from "@repo/ui/admin";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      
      <Button appName='Web' className='border-1'>
         Hello Button
      </Button>

      <Admin/>

    </div>
  );
}
