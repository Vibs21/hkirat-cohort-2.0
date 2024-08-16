import revalidate from '../lib/action1';

export default async function Blog() {
    const res = await fetch('https://sum-server.100xdevs.com/todos', { next: { tags: ['todos'] } })

    const data = await res.json();
    revalidate('todos');
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
// here we have given a tag to the url, now we can add certain condition and when that condition is meet one can call the revalidate method, implemetaion of which is done in the actions, where we tell that we want to revalidate i.e. recall the api which is tagged as 'todos' (in this case)