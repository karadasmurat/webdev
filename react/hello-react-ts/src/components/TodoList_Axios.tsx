import { Todo } from "../models/Todo";

interface Props {
  todos: Todo[]; // accept a list of Todos.
}

const TodoList_Axios = ({ todos }: Props) => {
  // display a list of todos from the props

  // fetch todos from api
  // update state, which keeps
  return (
    <div className="container">
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList_Axios;
