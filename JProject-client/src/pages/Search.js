import {useParams} from 'react-router-dom'
import React, {  useState} from 'react';
import ErrorPage from "../components/SearchError";
import SearchEntry from "../components/SearchEntry";
import SearchTools from "../components/SearchTools";
import { useSearchResults } from '../hooks/useSearchResults';
export default function SearchPage(){
    const { searchQuery } = useParams();
    const {kanjiResults, wordResults} = useSearchResults(searchQuery);

    //id of the entry that is currently open
    const [openDropdownId, setOpenDropdownId] = useState(null);

    //when toggle clicked, it compares the current entry id to the open dropdown's id. if same entry, close it, else set the new
    //dropdownID to id
    const handleDropdownToggle = (id) => {
      setOpenDropdownId(openDropdownId === id ? null : id);
    };
    
    return(
        <div className = "flex flex-col px-72 pt-10" style={{ backgroundColor: "#313131", minHeight: "100vh" }}>
            <SearchTools/>
            {(kanjiResults === null && wordResults===null) ? (
              <ErrorPage/>
            ) : (
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
                      openDropdownId={openDropdownId}a
                      onDropdownToggle={()=> handleDropdownToggle(index)}
                      />
                    </div>
                  ))}
                </div>
              )}

        </div> )}
            
        </div>
    )
}
