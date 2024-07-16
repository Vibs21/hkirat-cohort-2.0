//NOTE: Better Fetches
import { PrismaClient } from "@prisma/client";

import client from "@/db";

async function getUserDetails() {
  try {
    const user = await client.user.findFirst({});
	  return {
      name: user?.username,
      email: user?.username
    }
  }  catch(e) {
    console.log(e);
  }
}

//NOTE: Only the FE logic will go to the FE
export default async function Home() {
  const userData = await getUserDetails();

  return (
    <div className="flex flex-col justify-center h-screen">
        <div className="flex justify-center">
            <div className="border p-8 rounded">
                <div>
                    Name: {userData?.name}
                </div>
                
                {userData?.email}
            </div>
        </div>
    </div>
  );
}

// import axios from "axios";

// async function getUserDetails() {
//   await new Promise((r) => setTimeout(r,1000))
//   const response = await axios.get("http://localhost:3000/api/user")
// 	return response.data;
// }

// export default async function Home() {
//   const userData = await getUserDetails();

//   return (
//     <div className="flex flex-col justify-center h-screen">
//         <div className="flex justify-center">
//             <div className="border p-8 rounded">
//                 <div>
//                     <p className='font-semibold float-left'>Name:</p> {userData?.name}
//                 </div>
                
//                 {userData?.email}
//             </div>
//         </div>
//     </div>
//   );
// }
