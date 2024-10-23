import { useState, useEffect } from 'react';

export const useSearchResults = (searchQuery) => {
  const [kanjiResults, setKanjiResults] = useState([]);
  const [wordResults, setWordResults] = useState([]);

  useEffect(() => {
    if (!searchQuery) {
      const storedResults = localStorage.getItem('searchResults');
      if (storedResults) {
        const { kanjiDataResults, wordDataResults } = JSON.parse(storedResults);
        setKanjiResults(kanjiDataResults || []);
        setWordResults(wordDataResults || []);
      }
    } else {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/api/search`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: searchQuery }),
          });

          if (response.ok) {
            const data = await response.json();
            const kanjiDataResults = data.results.mappedKanjiData || [];
            const wordDataResults = data.results.mappedWordData || [];
            setKanjiResults(kanjiDataResults);
            setWordResults(wordDataResults);
            localStorage.setItem(
              'searchResults',
              JSON.stringify({ kanjiDataResults, wordDataResults })
            );
          } else {
            console.log('Search Failed');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      fetchData();
    }
  }, [searchQuery]);

  return { kanjiResults, wordResults };
};
