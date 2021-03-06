import React, { useState, useRef, useEffect } from 'react'
import TodoList from './TodoList'
import client from '../api/client'
import { useFetchOrCreateList } from "../hooks/useFetchOrCreateList";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useDebounce from '../hooks/useDebounce';
import { ListItem } from '../interfaces/Todo';

export default function ListPage() {
    const [todos, setTodos] = useState<Array<ListItem>>([])
    const [listId, setListId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [showCompleted, setShowCompleted] = useState<boolean>(true)

    const todoNameRef = useRef<HTMLInputElement>(null)
    const currentLink = window.location.href;

    useFetchOrCreateList(setListId, setTitle, setTodos, todos);

    useEffect(() => {
        const persistTodos = async () => {
            if (listId) {
                await client.post('/updateList', { id: listId, items: todos })
            }
        }

        persistTodos();

    }, [todos, listId])


    function toggleTodo(id: number) {
        const newTodos = [...todos]
        const todo = newTodos.find(todo => todo.id === id)
        if (!todo) return
        todo.complete = !todo.complete
        setTodos(newTodos)
    }

    async function handleAddTodo(e: any) {
        if (!todoNameRef || !todoNameRef.current) return
        const name = todoNameRef.current.value

        if (name === '') return
        setTodos(prevTodos => {
            return [{ id: prevTodos.length + 1, description: name, complete: false }, ...prevTodos]
        })

        todoNameRef.current.value = ''
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
    }

    const copyLinkToClipboard = async () => {
        navigator.clipboard.writeText(currentLink)
        toast("Shareable link copied to clipboard!", { toastId: 'no-duplicates' })
    }

    const getTodosToShow = () => {
        return showCompleted
            ? JSON.parse(JSON.stringify(todos))
            : JSON.parse(JSON.stringify(todos.filter(t => !t.complete)))
    }

    const persistTitle = async () => {
        if (!title) return
        await client.post('/updateList/title', { id: listId, title })
    }

    const debouncedPersistTitle = useDebounce(persistTitle, 500);

    useEffect(() => {
        debouncedPersistTitle();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title])

    return (
        <div
            className="w-full max-h-screen overflow-y-scroll h-screen flex items-center justify-center font-sans bg-gradient-to-b from-teal-500 via-teal-400 to-blue-600">
            <div
                className="bg-white border border-teal-400 rounded shadow-2xl p-6 m-4 w-full max-w-lg lg:max-w-2xl h-auto max-h-screen overflow-y-scroll">
                <div className="flex justify-center">
                    <input
                        className="focus:outline-none w-full rounded p-2 mb-4 focus:ring focus:border-teal-500 text-center text-xl"
                        placeholder="Todo List Title (you can edit me)"
                        title="Click to edit list title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={() => persistTitle()}
                    >
                    </input>
                </div>
                <hr />
                <form onSubmit={handleSubmit}>
                    <div className="flex mt-8 justify-center">
                        <input
                            className="shadow appearance-none border rounded md:w-1/2 w-full py-2 px-3 mr-4 text-gray-500 focus:outline-none focus:ring focus:border-teal-500"
                            placeholder="Add Item"
                            ref={todoNameRef}
                        />
                        <button
                            className="flex-no-shrink p-2 border-2 rounded border-teal-500 text-teal-500  hover:text-white hover:bg-teal-500 focus:outline-none focus:ring focus:border-teal-500"
                            onClick={handleAddTodo}>
                            Add
                        </button>
                    </div>
                </form>
                <div className="mt-8 h-auto flex justify-center shadow border">
                    <TodoList todos={getTodosToShow()} toggleTodo={toggleTodo} />
                </div>
                <div className="flex justify-end mt-4 ">
                    <button
                        className="p-2 border rounded-xl text-white bg-red-500 focus:outline-none focus:ring focus:border-teal-500"
                        onClick={() => setShowCompleted(!showCompleted)}
                    >
                        Toggle Completed
                    </button>
                </div>
                <div className="flex flex-col text-center text-gray-500 mt-2 items-center">
                    <span className="mb-3"> Share this list with your friends! </span>
                    <input
                        className="w-full text-center mb-2 border border-gray-300 rounded-lg mb-3"
                        value={currentLink}
                        readOnly
                    />
                    <button
                        onClick={() => copyLinkToClipboard()}
                        className="bg-blue-200 w-auto mt-2 p-2 rounded-xl"
                    >
                        Copy!
                    </button>
                </div>
            </div>
            <ToastContainer limit={2} />
        </div>
    )
}
