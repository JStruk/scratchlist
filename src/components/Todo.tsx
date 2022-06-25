import React from 'react'
import { ListItem } from '../interfaces/Todo'

interface TodoProps {
    todo: ListItem
    toggleTodo: (id: number) => void
}

export default function Todo({ todo, toggleTodo }: TodoProps): JSX.Element {
    function handleTodoClick() {
        toggleTodo(todo.id)
    }

    return (
        <tr className="">
            <td className="text-center border px-8 py-4">{todo.id}</td>
            <td className="text-center border px-8 py-4">{todo.description}</td>
            <td className="text-center border px-8 py-4">
                <input type="checkbox" className="h-7 w-7" onChange={handleTodoClick} checked={todo.complete} />
            </td>
        </tr>
    )
}
