import React from "react";
import { useState } from "react";
// Tell functional component to expect 'props'
export default function TodoInput(props) {
    // Destructure out functions
    const { handleAddTodos, todoValue, setTodoValue } = props

    // The handleKeyDown function checks if the pressed key is Enter and calls handleAddTodos and setTodoValue appropriately.
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAddTodos(todoValue)
            setTodoValue('')
        }
    }

    return (
        <header>
            <input
                value={todoValue}
                onChange={(e) => { setTodoValue(e.target.value) }}
                // Add the onKeyDown event listener to the input element.
                onKeyDown={handleKeyDown}
                placeholder="Enter to-do..." />
            {/* Assign handleAddTodos to button with arrow function */}
            <button onClick={() => {
                handleAddTodos(todoValue)
                // Reset input bar to empty string after entry is added
                setTodoValue('')
            }}>Add</button>
        </header>
    )
}
