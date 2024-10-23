const { readingBeginning, kanjiAnywhere, setup: setupJmdict, readingAnywhere, getTags, idsToWords, kanjiBeginning } = require('jmdict-simplified-node');
const translate = require('@iamtraction/google-translate');
const jmdictPromise = setupJmdict('my-jmdict-simplified-db', 'jmdict-eng-3.5.0.json');
const wanakana = require('wanakana');
const fs = require('fs')
const path = require('path')

const kanjiJsonPath = path.join(__dirname, 'kanji.json');
let kanjiData = {}
try {
  kanjiData = JSON.parse(fs.readFileSync(kanjiJsonPath, 'utf-8'));
} catch (error) {
  console.error('Error loading kanji JSON file:', error);
}
let db = null;
jmdictPromise.then(({ db: database }) => {
  db = database;
}).catch(error => {
  console.error('Error setting up database:', error);
});

const wordListPath= path.join(__dirname, 'wordlist.txt')
const wordList = new Set(fs.readFileSync(wordListPath, 'utf-8').split('\n').map(word => word.trim().toLowerCase()));

function isEngWord(word) {
  console.log("eng word check", wordList.has(word.toLowerCase()))
  return wordList.has(word.toLowerCase())
}

//results=array of arrays. each array contains[] 
async function search(query) {
  console.log("query",query)
  let results = [];
  let mappedKanjiData = [];
  let mappedWordData = [];
  let translatedQuery = query
  if (isEngWord(query)) {
    console.log("English word detected:",query);
    await translate(query, { from: 'en', to: 'ja' }).then(res => {
      translatedQuery = res.text 
    }).catch(err => {
      console.error(err);
    });
    console.log("translated query:",translatedQuery)
  } else if (wanakana.isRomaji(query) && !(/[a-zA-Z]/.test(wanakana.toKana(query))) ) {
    translatedQuery = wanakana.toKana(query)
    console.log( "romaji query", translatedQuery)
  } 

 
  try {
    const containsKanji = /[一-龯]/.test(translatedQuery);
    if (containsKanji) {
      results = await  kanjiBeginning(db, translatedQuery, 50);
      console.log("contains kanji");
      for (let i = 0; i < translatedQuery.length; i++) {
        const char = translatedQuery[i];
        if (/[一-龯]/.test(char)) { 
          let otherResult = []
          if (kanjiData[char]) {
            otherResult = {
              kanji: char,
              ...kanjiData[char]
            };
          }
          if (otherResult) {
            mappedKanjiData.push({
              kanjiForms: otherResult.kanji,
              readings_on: otherResult.readings_on,
              readings_kun: otherResult.readings_kun,
              meanings: otherResult.meanings,
              strokes: otherResult.strokes,
              jlpt_level: otherResult.jlpt_new
            })
          }
        }
      }
    }  else {
      console.log("does not contain kanji");
      results = await readingBeginning(db, translatedQuery, 50);
    }
    
    const seenKanjiForms = new Set();
    if (results.length > 0) {
      results.forEach( result => {
        const kanjiForms = result.kanji.map(kanjiEntry => kanjiEntry.text).join(',');
        if (!seenKanjiForms.has(kanjiForms)) {
          const kanaReadings = result.kana.map(kanaEntry => kanaEntry.text);
          const glossDefinitions = result.sense[0].gloss.map(glossEntry => glossEntry.text);
          const partOfSpeech = result.sense[0].partOfSpeech;
          mappedWordData.push({
            kanjiForms: kanjiForms.split(','), // Convert back to array
            kanaReadings: kanaReadings,
            glossDefinitions: glossDefinitions,
            partOfSpeech: partOfSpeech
          });
          seenKanjiForms.add(kanjiForms);
        }
      })
    } else {
      results = await  kanjiAnywhere(db, translatedQuery, 5);
      console.log("No results found.");
    }
    return {mappedKanjiData,mappedWordData};
  } catch (error) {
    console.error('Error during search:', error);
    throw new Error('An error occurred during search');
  }
}

module.exports = {
  search,
};
