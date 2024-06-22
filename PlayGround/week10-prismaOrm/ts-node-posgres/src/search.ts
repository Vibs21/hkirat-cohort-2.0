import { Client } from 'pg';

async function searchData(email: string) {

    const client = new Client({
        connectionString: "postgresql://learn_owner:t4e5JkQAbfxm@ep-crimson-field-a5lobgxn.us-east-2.aws.neon.tech/learn?sslmode=require"
    })

    await client.connect();

    const query = "SELECT * from users where email = $1";
    const result = await client.query(query, [email]);

    console.log("result: ", result);
    
}

searchData("user5@example.com");