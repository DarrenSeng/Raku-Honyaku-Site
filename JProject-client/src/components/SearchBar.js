import {React, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SearchBar({query='',setQuery, inputRef}) {

  useEffect(() => {
    const storedQuery = localStorage.getItem('searchQuery');
    if (storedQuery) {
      setQuery(storedQuery);
    }
  }, [setQuery]);


  const navigate = useNavigate();
  const emptySearchToastId = useRef(null);

  const handleChange = async (event) => {
    const inputQuery = event.target.value;
      setQuery(inputQuery);
      localStorage.setItem('searchQuery', inputQuery);
  };

  const handleClear = () => {
    setQuery('');
    localStorage.removeItem('searchResults');
    localStorage.removeItem('searchQuery');
  }

  
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    if (!query.trim()) { // Check if query is empty or just whitespace
      if (!toast.isActive(emptySearchToastId.current)) { // Check if toast is already active
        emptySearchToastId.current = toast.error('Search field is empty. Please enter a query.', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      }
      return; // Don't navigate
    }
    localStorage.setItem('searchQuery', query);
    localStorage.removeItem('searchResults');
    navigate(`/search/${encodeURIComponent(query)}`);
  };


  return (
    <>
      <form onSubmit={handleSubmit} className="flex w-full">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search..."
          className="flex-grow border border-gray-900 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 bg-gray-800 text-white"
        />
        <button
          type="button"
          onClick={handleClear}
          className="bg-gray-700 text-white px-3 py-2 rounded-md ml-2 hover:bg-gray-800 flex-shrink-0"
          style={{ minWidth: '80px' }} 
        >
          Clear
        </button>
        <button
          type="submit"
          className="bg-blue-800 text-white px-4 py-2 rounded-md ml-2 hover:bg-blue-900 flex-shrink-0"
          style={{ minWidth: '80px' }}
        >
          Search
        </button>
      </form>
      <ToastContainer />
    </>
  );
}

export default SearchBar;
