export default async function Blog() {
    const res = await fetch('https://sum-server.100xdevs.com/todos', {
        next: { revalidate: 10 }
    });

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
// but using revalidate:10, we can again call out the fetch url in every 1osec