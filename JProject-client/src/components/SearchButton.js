import React from 'react';

export default function SearchButton({ buttonName = "", onClick, icon: Icon }) {
    return (
        <button
            onClick={onClick}
            className="bg-blue-800 text-white px-4 py-2 rounded-md mx-1 hover:bg-blue-900 h-[45px]">
            {Icon ? <Icon size={17} /> : <span className="whitespace-nowrap">{buttonName}</span>}
        </button>
    );
}
