export default async function Blog() {
    const res = await fetch('https://sum-server.100xdevs.com/todos')

    const data = await res.json();
    const todos = data.todos;

    console.log("todos", );
    return <div>
        {todos.map((todo: any) => <div key={todo.id}>
            {todo.title}
            {todo.description}
        </div>)}
    </div>
    
}

//NOTE: When we creates the build, the html page gets generated, witch hardcoded values you can say, whenever you hit that route it will return the same value to everyone always...
// to update the update there are a few ways using revalidate object