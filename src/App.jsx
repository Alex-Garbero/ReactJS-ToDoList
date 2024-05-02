
import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
	// Define todo list in parent component so TodoList, TodoCard, etc. can all access it.
	// Stateful variable that we can interact with
	const [todos, setTodos] = useState([])
	const [todoValue, setTodoValue] = useState('')

	function persistData(newList) {
		localStorage.setItem('todos', JSON.stringify({ todos: newList }))
	}
	// Create function that is used to handle adding todos
	function handleAddTodos(newTodo) {
		// Create new array 'newTodoList'
		const newTodoList = [...todos, newTodo]
		persistData(newTodoList)
		// When state changes, DOM is repainted to match new values
		setTodos(newTodoList)
	}

	function handleDeleteTodo(index) {
		// Filtering method returns whether or not we want the particular element in the array
		const newTodoList = todos.filter((todo, todoIndex) => {
			return todoIndex !== index
		})
		persistData(newTodoList)
		// Call setTodos to modify the list
		setTodos(newTodoList)
	}

	function handleEditTodo(index) {
		const valueToBeEdited = todos[index]
		// Set value in the input to the value to be edited
		setTodoValue(valueToBeEdited)
		// Delete current instance
		handleDeleteTodo(index)
	}

	// useEffect function to ensure To-Do list keeps info on reload
	useEffect(() => {
		if (!localStorage) {
			return
		}

		let localTodos = localStorage.getItem('todos')
		if (!localTodos) {
			return
		}
		// If localTodos exists, then...
		localTodos = JSON.parse(localTodos).todos
		// setTodos to localTodos
		setTodos(localTodos)
	
	// Because dependency array is empty [], this will run whenever the page reloads/refreshes
	}, [])

    return (
        <>
			{/* Pass function handleAddTodos as an attribute prop */}
			<TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos}/>
			{/* Pass in attribute to component tag: todos={todos} */}
			{/* This way, todo list is accessible by destructuring as a prop in components */}
			{/* The buttons for deleting are in TodoList, so we pass the function as a prop */}
            <TodoList handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo} todos={todos} />
        </>
    );
}

export default App;
