import { useState } from "react";
// Tell functional component to expect 'props'
export default function TodoInput(props) {
	// Destructure out handleAddTodos function
	const { handleAddTodos } = props

	const [todoValue, setTodoValue] = useState('')

    return (
        <header>
            <input value={todoValue} onChange={(e) => {
				setTodoValue(e.target.value)
			}}
			placeholder="Enter todo..." />
			{/* Assign handleAddTodos to button with arrow function */}
            <button onClick={() => {
				handleAddTodos(todoValue)
				// Reset input bar to empty string after entry is added
				setTodoValue('')
			}}>Add</button> 
        </header>
    );
}
