import React from "react";

// Receive the children via the props of the component TodoCard
export default function TodoCard(props) {
	// Destructure 'children' out from 'props'
	// Will give us access to all of the 'children' elements
	const { children, handleDeleteTodo, index, handleEditTodo, isSelected, onClick } = props;
    return (
        // Add list items by index
        <li 
			className={`todoItem ${isSelected ? 'selected' : ''}`} // Add selected class
			onClick={onClick}
		>

			{/* Render out children using curly braces */}
			{children}
            <div className="actionsContainer">
                {/* Add edit button from fontawesome to each item */}
				<button onClick={() => handleEditTodo(index)}>
					<i className="fa-solid fa-pen-to-square"></i>
				</button>
				{/* Call handleDeleteTodo function on button click */}
                <button onClick={() => handleDeleteTodo(index)}>
					<i className="fa-solid fa-trash-can"></i>
				</button>
            </div>
        </li>
    );
}
