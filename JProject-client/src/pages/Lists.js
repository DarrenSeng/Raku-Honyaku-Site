import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import SearchEntry from '../components/SearchEntry';
import { toast } from 'react-toastify';
import { MdOutlineExpandLess } from "react-icons/md";
import { MdOutlineExpandMore } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

export default function Lists() {
  const [studyLists, setStudyLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedListIndex, setExpandedListIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);
  useEffect(() => {
    const fetchStudyLists = async () => {
      const uid = localStorage.getItem('uid');
      if (!uid) {
        setError('You need to log in to create and view your saved study lists.');
        setLoading(false);
        return;
      }

      try {
        const response = await Axios.get(`http://localhost:3001/api/users/studylists/${uid}`);
        if (response.data && response.data.length > 0) {
          setStudyLists(response.data);
        } else {
          setError('Study list is empty.');
        }
      } catch (err) {
        setError('An error occurred while fetching the study list.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudyLists();
  }, []);

  

  const handleRemove = async (listTitle, word) => {
    try {
      await Axios.post(`http://localhost:3001/api/users/studylists/remove/${localStorage.getItem('uid')}/${listTitle}/${word}`);
      // Re-fetch lists after removal
      const response = await Axios.get(`http://localhost:3001/api/users/studylists/${localStorage.getItem('uid')}`);
      setStudyLists(response.data);
    } catch (error) {
      console.error('Error removing word:', error);
    }
  };

  const handleDeleteList = async (title) => {
    try {
      const uid = localStorage.getItem('uid');
      const response = await Axios.post(`http://localhost:3001/api/users/studylists/delete/${uid}/${title}`);
      if (response.status === 200) {
        toast.success(`List "${title}" deleted successfully.`);
        setStudyLists(prevLists => prevLists.filter(list => list.title !== title))
        onCloseModal();
      } else {
        toast.error('Failed to delete list')
      }
    } catch (error) {
      console.log("Error deleting list: ", error);
      toast.error('Failed to delete list');
    }
  }

  const toggleList = (index) => {
    setExpandedListIndex(expandedListIndex ===index ? null:index);
  }

  const openDeleteModal = (listTitle) => {
    setListToDelete(listTitle);
    setIsModalOpen(true);
  }

  const onCloseModal = () => {
    setIsModalOpen(false);
    setListToDelete(null);
  }

  if (loading) {
    return <div className="min-w-[1300px]" style={{ backgroundColor: "#313131", minHeight: "100vh" }}></div>;
  }

  if (error) {
    return <div className="min-w-[1300px] text-center text-slate-200 py-10" 
      style={{ backgroundColor: "#313131", minHeight: "100vh" }}>
        <p className="text-2x1 font-semibold">{error}</p>
        <p className="text-xl mt-4">Please <a href="/login" className="text-blue-500 hover:underline">log in</a> to access your study lists.</p>
      </div>;
  }

  return (
    <div className="py-10 pl-72 pr-56 flex flex-col text-center text-slate-200 min-w-[1300px]" style={{ backgroundColor: "#313131", minHeight: "100vh" }}>
      <h2 className="text-3xl mb-8 text-left">Saved Words</h2>
      {studyLists.length > 0 ? (
        studyLists.map((list, listIndex) => (
          <div key={listIndex} className="mb-12 bg-gray-800 border border-gray-600 rounded-lg shadow-lg p-5">
            <div className = "flex justify-between px-5">
              <h3 className="text-2xl mb-4 text-left">{list.title}</h3>
              <div className = "flex">
                {list.title !== 'Favorites' && (
                  <button onClick = {() => openDeleteModal(list.title)} className="mr-4 mb-4">
                    <FaTrashAlt style={{fontSize: '30px'}}/>
                  </button>
                )}
                <button
                  onClick={() => toggleList(listIndex)} className="mb-4"
                >
                  {expandedListIndex === listIndex ? (<MdOutlineExpandLess style={{fontSize: '44px', color: '#EF4444'}}/> ): 
                  <MdOutlineExpandMore style={{fontSize: '44px', color: "#E2E8F0"}}/>}
                </button>
              </div>
            </div>
            {expandedListIndex === listIndex && (
              <ul>
                {list.words.length > 0 ? (
                  list.words.map((word, wordIndex) => (
                    <div key={wordIndex} className="mb-8">
                      <SearchEntry
                        resultType="word"
                        kanjiForms={word.kanjiForms}
                        kanaReadings={word.kanaReadings}
                        glossDefinitions={word.glossDefinitions}
                        partOfSpeech={word.partOfSpeech}
                        source = "listspage"
                        onRemove = {() => handleRemove(list.title, word.kanjiForms[0] || word.kanaReadings[0])}
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-left px-5">This list is empty.</div>
                )}
              </ul>
            )}
          </div>
        ))
      ) : (
        <div>Study list is empty.</div>
      )}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        onConfirm={() => handleDeleteList(listToDelete)}
        listTitle={listToDelete}
      />
    </div>
  );
};
  