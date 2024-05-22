import React from "react";
import TodoCard from "./TodoCard";

export default function TodoList(props) {
    const { todos, selectedIndex, setSelectedIndex } = props

    return (
        <ul className="main">
            {/* To render this out, we use what's called "Mapping out Content"
            We use the array method '.map' and an arrow function '=>'
            The arguments for the arrow function are 'todo' and 'todoIndex' */}
            {todos.map((todo, todoIndex) => {
                return (
                	<TodoCard
					{...props}
					key={todoIndex}
					index={todoIndex}
					// Pass 'selectedIndex' and 'setSelectedIndex' to 'TodoCard'
					isSelected={todoIndex === selectedIndex}
					onClick={() => setSelectedIndex(todoIndex)}
					>
					{/* With components, to render out the children contents within the component, you have to go into the component ('TodoCard') and receive the children via the properties ('props') of the component. See TodoCard.jsx for implementation. */}
						<p>{todo}</p>
                	</TodoCard>
                )
            })}
        </ul>
    )
}
