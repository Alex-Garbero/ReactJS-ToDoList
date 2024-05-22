
import React, { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
	// Define todo list in parent component so TodoList, TodoCard, etc. can all access it.
	// Stateful variable that we can interact with
	const [todos, setTodos] = useState([])
	const [todoValue, setTodoValue] = useState('')
	const [selectedIndex, setSelectedIndex] = useState(null); // State to manage selected item for arrow key selector function

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
		setSelectedIndex(null); // Clear selection after deleting to-do with arrow key selector function
	}

	function handleEditTodo(index) {
		const valueToBeEdited = todos[index]
		// Set value in the input to the value to be edited
		setTodoValue(valueToBeEdited)
		// Delete current instance
		handleDeleteTodo(index)
	}
	// Logic to select to-do item with arrow keys and delete with 'Delete' key
	function handleKeyDown(e) {
		// Check if the pressed key is 'ArrowUp'
		if (e.key === 'ArrowUp') {
			if (selectedIndex === 0) {
				// If the selected index is 0 (first to-do item), clear the selection
				setSelectedIndex(null);
				// Focus the input element with ID 'todo-input'
				document.getElementById('todo-input').focus();
			} else if (selectedIndex !== null) {
				// If a to-do item is currently selected (selectedIndex is not null)
				// Move the selection up to the previous item, if not already at the first item
				setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
			}
		} 
		// Check if the pressed key is 'ArrowDown'
		else if (e.key === 'ArrowDown') {
			if (selectedIndex === null) {
				// If no item is currently selected (selectedIndex is null), select the first to-do item
				setSelectedIndex(0);
			} else {
				// If a to-do item is currently selected (selectedIndex is not null)
				// Move the selection down to the next item, if not already at the last item
				setSelectedIndex((prevIndex) => (prevIndex < todos.length - 1 ? prevIndex + 1 : prevIndex));
			}
		} 
		// Check if the pressed key is 'Backspace'
		else if (e.key === 'Backspace' && selectedIndex !== null) {
			// If a to-do item is currently selected (selectedIndex is not null), delete the selected to-do item
			handleDeleteTodo(selectedIndex);
		}
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

	// New useEffect for arrow key selector function
	useEffect(() => {
		// Add event listener for keydown
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			// Clean up event listener
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [selectedIndex, todos]);

    return (
        <>
			{/* Pass function handleAddTodos as an attribute prop */}
			<TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos}/>
			{/* Pass in attribute to component tag: todos={todos} */}
			{/* This way, todo list is accessible by destructuring as a prop in components */}
			{/* The buttons for deleting are in TodoList, so we pass the function as a prop */}
            <TodoList
				handleEditTodo={handleEditTodo}
				handleDeleteTodo={handleDeleteTodo}
				todos={todos}
				selectedIndex={selectedIndex}
				setSelectedIndex={setSelectedIndex}
			/>
        </>
    );
}

export default App;
