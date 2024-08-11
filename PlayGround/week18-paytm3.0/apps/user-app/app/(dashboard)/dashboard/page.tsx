import { useSession } from 'next-auth/react'
import { authOptions } from '../../lib/auth'
import { getServerSession } from 'next-auth';

async function getUserDetails() {
    return await getServerSession(authOptions);
}

export default async function() {

    const userDetails = await getUserDetails();

    console.log('userDetails',userDetails)

    return <div>
        Dashboard
        {JSON.stringify(userDetails) }
    </div>
}