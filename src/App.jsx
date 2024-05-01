
import { useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
	// Define todo list in parent component so TodoList, TodoCard, etc. can all access it.
	// Stateful variable that we can interact with
	const [todos, setTodos] = useState([
	])

	// Create function that is used to handle adding todos
	function handleAddTodos(newTodo) {
		// Create new array 'newTodoList'
		const newTodoList = [...todos, newTodo]
		// When state changes, DOM is repainted to match new values
		setTodos(newTodoList)
	}

    return (
        <>
			{/* Pass function handleAddTodos as an attribute prop */}
			<TodoInput handleAddTodos={handleAddTodos}/>
			{/* Pass in attribute to component tag: todos={todos} */}
			{/* This way, todo list is accessible by destructuring as a prop in components */}
            <TodoList todos={todos}/>
        </>
    );
}

export default App;
