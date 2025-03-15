'use client'

import React from 'react'

interface ViewSelectorProps {
    view: string
    setView: (view: string) => void
}

const ViewSelector: React.FC<ViewSelectorProps> = ({ view, setView }) => {
    const views = ['year', 'month', 'week', 'day']

    return (
        <div className="flex justify-center gap-2 mb-4">
            {views.map((option) => (
                <button
                    key={option}
                    className={`px-3 py-1 rounded ${
                        view === option
                            ? 'bg-gray-700 text-white'
                            : 'bg-zinc-800'
                    }`}
                    onClick={() => setView(option)}
                >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
            ))}
        </div>
    )
}

export default ViewSelector
