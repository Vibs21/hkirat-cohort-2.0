import { Client } from 'pg';

// Async function to insert data into a table
async function insertData(username: string, email: string, password: string) {
    const client = new Client({
        connectionString: "postgresql://learn_owner:t4e5JkQAbfxm@ep-crimson-field-a5lobgxn.us-east-2.aws.neon.tech/learn?sslmode=require"
    })

  try {
    await client.connect(); // Ensure client connection is established
    //NOTE: Use parameterized query to prevent SQL injection
    const insertQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
    const values = [username, email, password];
    const res = await client.query(insertQuery, values);
    console.log('Insertion success:', res); // Output insertion result
  } catch (err) {
    console.error('Error during the insertion:', err);
  } finally {
    await client.end(); // Close the client connection
  }
}

// Example usage
insertData('username5', 'user5@example.com', 'user_password').catch(console.error);