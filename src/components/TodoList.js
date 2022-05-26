import React from 'react'
import Todo from './Todo'

export default function TodoList({ todos, toggleTodo }) {
    return (
        <div className="w-full max-w-lg lg:max-w-2xl justify-center">
            <table className="table-fixed" >
                <thead>
                    <tr>
                        <th className="w-1/12 sticky top-0 bg-teal-300 text-center px-8 text-gray-700">#</th>
                        <th className="w-10/12 sticky top-0 bg-teal-400 text-center px-8 text-gray-700">Description</th>
                        <th className="w-1/12 sticky top-0 bg-teal-300 text-center px-8 text-gray-700">Done</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.reverse().map((todo, index) => {
                        return <Todo key={index} toggleTodo={toggleTodo} todo={todo} />
                    })}
                </tbody>
            </table>
        </div>
    )
}
