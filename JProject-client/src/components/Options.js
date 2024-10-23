import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import CreateStudyListModal from './CreateStudyListModal';
import {toast} from 'react-toastify'

export default function Options({isOpen,toggleDropdown,word}) {

  const [studyLists, setStudyLists] = useState([]);
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const hasFetchedStudyLists = useRef(false);

  const fetchStudyLists = async () => {
    const uid = localStorage.getItem('uid');
    setLoading(true);  
    try {
      const response = await Axios.get(`http://localhost:3001/api/users/studylists/${uid}`);
      if (response.data && response.data.length > 0) {
        setStudyLists(response.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);  
      hasFetchedStudyLists.current = true; 
    }
  };

  const handleCreateStudyList = async (title) => {
    const uid = localStorage.getItem('uid');
    console.log(word, "added to", title)
    try {
        const response = await Axios.post(`http://localhost:3001/api/users/studylists/add/${uid}/${title}/${word}`);
        if (response.status === 200) {
            toast.success(`${word} added to "${title}" successfully.`);
            
        } else if (response.status === 201) {
            toast(`${word} is already in "${title}"`)
        } 
        else {
            toast.error(`${word} could not be added.`);
        }
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false);
      }
    };
  
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      toggleDropdown();
    }
  };
  
    

  useEffect(() => {
    if (isOpen && !hasFetchedStudyLists.current) {
      fetchStudyLists();  
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

    
  return (
    <div className="relative inline-block text-left" ref = {dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Add to List
      </button>

      {isOpen && (
        <div className="absolute left-28 -top-2 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-md shadow-lg">
          <ul>
          {loading ? (
            <li className='=px-4 py-2 text-white'>:Loading...</li>
          ):(
            <>
            {studyLists.map((list) => (
                <li key={list.title}>
                    <button
                        onClick={() => handleCreateStudyList(list.title)}
                        className="block w-full px-4 py-2 text-white text-left hover:bg-gray-700"
                    >
                        {list.title}
                  </button>
                </li>
            ))}
            <li>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="block w-full px-4 py-2 text-white text-left hover:bg-gray-700"
                  >
                    Create Study List
                  </button>
                </li>
            </>
          )}
          </ul>
        </div>
      )}
    <CreateStudyListModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        studyLists={studyLists}
        setStudyLists={setStudyLists}
      />
    </div>
  );
};
