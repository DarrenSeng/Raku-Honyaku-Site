import React, { useState, useContext, useEffect, useRef } from 'react';
import SearchBar from "../components/SearchBar";
import SearchButton from "../components/SearchButton";
import { FaPencilAlt, FaUndoAlt, FaTrashAlt, FaSearch } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { AuthContext } from '../AuthContext';
import CreateStudyListModal from '../components/CreateStudyListModal';
import KanjiSuggestionButton from '../components/KanjiSuggestionButton';
import SearchEntry from './SearchEntry';
import { useSearchResults } from '../hooks/useSearchResults';

function SearchTools({isHomePage}) {
    const { isLoggedIn } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [candidates, setCandidates] = useState([]);
    const [query, setQuery] = useState('');
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const canvasRef = useRef(null);
    const isCanvasInitialized = useRef(false);
    const [loading, setLoading] = useState(true);
  
    const {kanjiResults, wordResults} = useSearchResults(isHomePage ? null:query);
    const inputRef = useRef(null);

    useEffect(() => {
      if (isHomePage && wordResults) {
          setLoading(false);
      }
  }, [isHomePage, wordResults]);

    const handleDropdownToggle = (id) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
      };
      

    const openDrawer = () => {
        setIsDrawerOpen(prev => !prev);
        if (!isCanvasInitialized.current && window.KanjiCanvas) {
            window.KanjiCanvas.init('can');
            isCanvasInitialized.current = true;
        }
    };

    const handleUndo = () => {
        if (window.KanjiCanvas) {
            window.KanjiCanvas.deleteLast('can');
        }
    };

    const handleErase = () => {
        if (window.KanjiCanvas) {
            window.KanjiCanvas.erase('can');
        }
    };

    const handleRecognize = () => {
        if (window.KanjiCanvas) {
            const result = window.KanjiCanvas.recognize('can');
            setCandidates(result.trim().split(/\s+/));
        }
    };

    const handleClose = () => {
      setIsDrawerOpen( prevState => !prevState)
    }

    const handleSuggestionClick = (suggestion) => {
      const input = inputRef.current;
      if (input) {
        const {selectionStart, selectionEnd} = input;
        const newQuery = query.slice(0, selectionStart) + suggestion + query.slice(selectionEnd);
        setQuery(newQuery);
        input.focus();
        input.setSelectionRange(selectionStart + suggestion.length, selectionStart + suggestion.length);
      }
      
    }

    const drawerClassNames = isDrawerOpen ? "flex mt-2 bg-gray-800 border-2 px-4 border-gray-900 p-1" : "h-[0px] w-[0px] opacity-0";

    return (
        <>
            <div className="flex flex-col items-center w-full relative">
                <div className="flex min-w-full">
                    <SearchButton icon={FaPencilAlt} onClick={openDrawer} />
                    <SearchBar query={query} setQuery={setQuery} inputRef={inputRef} />
                    {isLoggedIn && <SearchButton buttonName="Create study list" onClick={() => setIsModalOpen(true)} />}
                </div>
                <div className={drawerClassNames}>
                    <canvas ref={canvasRef} id="can" className="m-1" data-candidate-list="candidateList"
                        style={{ border: '4px solid #708090', borderRadius: '3px', width: '350px', height: '350px', padding: '0' }}></canvas>
                    <div className="flex flex-col">
                      <div className="flex justify-around mb-4">
                        <SearchButton onClick={handleUndo} icon={FaUndoAlt}/>
                        <SearchButton onClick={handleErase} icon={FaTrashAlt}/>
                        <SearchButton onClick={handleRecognize} icon={FaSearch}/>
                        <SearchButton onClick={handleClose} icon={GrClose}/>
                      </div>
                      <div id="candidateList" className="grid grid-cols-3 gap-2">
                        {candidates.map((candidate, index) => (
                            <KanjiSuggestionButton
                                key={index}
                                suggestion={candidate}
                                onClick={() => handleSuggestionClick(candidate)}
                            />
                        ))}
                      </div>
                    </div>
                </div>
            </div>
            
            <CreateStudyListModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
            {!loading && isHomePage && query==='' && wordResults=='' && (
                <div className="text-center text-slate-200 py-10 w-3/5 self-center mt-20">
                <p className="text-xl">
                    Raku Honyaku is a Japanese-English dictionary that lets you find words and kanji quickly. Currently, Raku Honyaku has a drawing search feature, and more lookup methods will be implemented in the future! In addition to the word and kanji information, you can create custom study lists for various purposes, such as words sharing the same kanji, words you looked up in a specific piece of media, or grouping words under certain themes.
                </p>
            
                <p className="text-xl mt-4">
                    Here's some example searches to give you an idea of how you can use Raku Honyaku:
                </p>
                <ul className="list-disc list-inside">
                    <li>連載</li>
                    <li>しんどい</li>
                    <li>cave</li>
                    <li>honyaku</li>
                </ul>
            
                <p className="text-xl mt-4">
                    Search results will provide the following information:
                </p>
                <ul className="list-disc list-inside">
                    <li>Part of Speech</li>
                    <li>Word type</li>
                    <li>Meaning</li>
                    <li>Reading</li>
                </ul>
            </div>
            
            )}
            {isHomePage && (kanjiResults.length > 0 || wordResults.length > 0) && (
                    <div className="py-5 flex-col text-slate-200">
                    {kanjiResults.length > 0 && (
                      <div className="flex">
                        <h2 className="text-3xl">Kanji: </h2>
                        <div className="flex flex-wrap">
                          {kanjiResults.map((entry,index) => (
                            <div key={index} className="mb-5">
                              <SearchEntry
                              resultType = "kanji"
                              key={index} 
                              kanjiForms={entry.kanjiForms}
                              readings_on= {entry.readings_on}
                              readings_kun={entry.readings_kun}
                              meanings = {entry.meanings}
                              strokes = {entry.strokes}
                              jlpt_level = {entry.jlpt_level}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {wordResults.length > 0 && (
                      <div className = "min-w-max">
                        <h2 className="text-3xl mb-4 text-left">Words</h2>
                        {wordResults.map((entry,index) => (
                          <div key={index} className="mb-5">
                            <SearchEntry
                            source = "searchpage"
                            resultType = "word"
                            id={index} 
                            kanjiForms={entry.kanjiForms}
                            kanaReadings={entry.kanaReadings}
                            glossDefinitions={entry.glossDefinitions}
                            partOfSpeech = {entry.partOfSpeech}
                            openDropdownId={openDropdownId}
                            onDropdownToggle={()=> handleDropdownToggle(index)}
                            />
                          </div>
                        ))}
                      </div>
                    )}
      
              </div>
                )}
        </>
    );
}

export default SearchTools;
