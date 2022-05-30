import React from 'react';
import { useNavigate } from "react-router-dom";
import TypeWriterEffect from 'react-typewriter-effect';

const ListTypes = [
    'ToDo List',
    'Grocery List',
    'Best-of List',
    'Inventory List',
    'Brainstorming List',
    'Ranking List',
    'CheckList'
];

export default function Home() {
    const navigate = useNavigate();

    const createNewList = () => {
        navigate('/list')
    }

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-300 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div className="text-center">
                            <h1 className="text-5xl text-teal-400"> ScratchList </h1>
                        </div>
                        <div className="divide-y divide-gray-200 text-center">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <p>The one-stop application for </p>
                                <TypeWriterEffect
                                    textStyle={{
                                        'textAlign': 'center'
                                    }}
                                    cursorColor="#3F3D56"
                                    multiText={ListTypes}
                                    multiTextDelay={1000}
                                    multiTextLoop
                                    typeSpeed={100}
                                />
                            </div>
                            <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                                <button onClick={createNewList} className="text-cyan-600 hover:text-cyan-700 border rounded-xl bg-teal-400 p-4"> Get Started! &rarr;</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

