import React from 'react'

export default function Todo({ todo, toggleTodo }) {
    function handleTodoClick() {
        console.log('toggle todo with id#', todo.id)
        toggleTodo(todo.id)
    }

    return (
        <tr className="">
            <td className="text-center border px-8 py-4">{todo.id}</td>
            <td className="text-center border px-8 py-4">{todo.description}</td>
            <td className="text-center border px-8 py-4">
                <input type="checkbox" className="h-7 w-7" onChange={handleTodoClick} />
            </td>
        </tr>
    )
}
