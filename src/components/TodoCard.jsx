import React, { Children } from "react";

// Receive the children via the props of the component TodoCard
export default function TodoCard(props) {
	// Destructure 'children' out from 'props'
	// Will give us access to all of the 'children' elements
	const {children} = props
    return (
        // Add list items by index
        <li className="todoItem">
			{/* Render out children using curly braces */}
			{children}
            <div className="actionsContainer">
                {/* Add edit button from fontawesome to each item */}
                <i className="fa-solid fa-pen-to-square"></i>
                <i className="fa-solid fa-trash-can"></i>
            </div>
        </li>
    );
}