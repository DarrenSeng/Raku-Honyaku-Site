import React, { useState, useEffect, useRef } from 'react';
import Axios from "axios";
import {toast} from 'react-toastify';
export default function CreateStudyListModal({ isOpen, onClose,studyLists, setStudyLists }) {
  const [title, setTitle] = useState('');
  const inputRef = useRef(null); 

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleCreateStudyList = async (title) => {
    try {
    const uid = localStorage.getItem('uid');
    const response = await Axios.post(`http://localhost:3001/api/users/studylists/create/${uid}/${title}`);
    if (response.status === 201) {
        toast.success(`Study list "${title}" created successfully.`);
        setTitle(''); 
        if (setStudyLists) {
          setStudyLists(response.data);
        }
      onClose(); 
    } else if (response.status === 202) {
      toast.error(response.data.message)
    }
    } catch (error) {
    console.error('Error creating study list:', error);
    toast.error('Failed to create study list.');
    }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-gray-800 border border-gray-700 rounded-md shadow-lg p-6 w-1/3">
        <h2 className="text-xl text-white mb-4">Create New Study List</h2>
        <input
          type="text"
          className="w-full px-3 py-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded-md"
          placeholder="Enter list title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          ref = {inputRef}
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-700"
          >
            Cancel
          </button>
          <button
            onClick={() => handleCreateStudyList(title)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
