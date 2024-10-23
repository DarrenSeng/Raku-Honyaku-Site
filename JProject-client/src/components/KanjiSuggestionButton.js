import React from 'react';

export default function KanjiSuggestionButton({ suggestion = "", onClick }) {
    
    //onclick passed 
    
    return (
        <button
            onClick={onClick}
            className="bg-gray-600 text-white px-3 py-2 rounded-md ml-2 hover:bg-gray-700">
            <span className="whitespace-nowrap text-4xl">{suggestion}</span>
        </button>
    );
}
