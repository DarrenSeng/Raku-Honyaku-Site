import React, {useContext} from 'react';
import Options from './Options';
import { AuthContext } from '../AuthContext';

const SearchEntry = ({ source = "", resultType = "", kanjiForms = "", readings_on = [], 
    readings_kun = [], meanings = [], strokes =  "", jlpt_level = "", 
     kanaReadings = [], glossDefinitions = [], partOfSpeech = [], id, openDropdownId, onDropdownToggle, onRemove }) => {
    
    const partOfSpeechParser = (string) => {
    switch(string) {
        case "n":
            return "Noun (common)";
        case "adj-na":
            return "Adjectival Noun (na-adjective)";
        case "adj-no":
            return "Adjectival Noun (no-adjective)";
        case "vi":
            return "Intransitive Verb";
        case "vt":
            return "Transitive Verb";
        case "adv":
            return "Adverb";
        case "adj-i":
            return "Adjective (keiyoushi)";
        case "adj-ix":
            return "Adjective (yoi/ii class)";
        case "adj-kari":
            return "'Kari' Adjective (archaic)";
        case "adj-ku":
            return "'Ku' Adjective (archaic)";
        case "adj-nari":
            return "Archaic/Formal Form of na-Adjective";
        case "adj-pn":
            return "Pre-Noun Adjectival (Rentaishi)";
        case "adj-shiku":
            return "'Shiku' Adjective (archaic)";
        case "adj-t":
            return "'Taru' Adjective";
        case "adv-to":
            return "Adverb Taking the 'to' Particle";
        case "aux":
            return "Auxiliary";
        case "aux-adj":
            return "Auxiliary Adjective";
        case "aux-v":
            return "Auxiliary Verb";
        case "conj":
            return "Conjunction";
        case "cop":
            return "Copula";
        case "ctr":
            return "Counter";
        case "exp":
            return "Expression (phrases, clauses, etc.)";
        case "int":
            return "Interjection";
        case "n-adv":
            return "Adverbial Noun";
        case "n-pr":
            return "Proper Noun";
        case "n-pref":
            return "Noun (used as a prefix)";
        case "n-suf":
            return "Noun (used as a suffix)";
        case "n-t":
            return "Noun (temporal)";
        case "num":
            return "Numeric";
        case "pn":
            return "Pronoun";
        case "pref":
            return "Prefix";
        case "prt":
            return "Particle";
        case "suf":
            return "Suffix";
        case "unc":
            return "Unclassified";
        case "v-unspec":
            return "Verb Unspecified";
        case "v1":
            return "Ichidan Verb";
        case "v1-s":
            return "Ichidan Verb - Kureru Special Class";
        case "v2a-s":
            return "Nidan Verb with 'u' Ending (archaic)";
        case "v2b-k":
            return "Nidan Verb (upper class) with 'bu' Ending (archaic)";
        case "v2b-s":
            return "Nidan Verb (lower class) with 'bu' Ending (archaic)";
        case "v2d-k":
            return "Nidan Verb (upper class) with 'dzu' Ending (archaic)";
        case "v2d-s":
            return "Nidan Verb (lower class) with 'dzu' Ending (archaic)";
        case "v2g-k":
            return "Nidan Verb (upper class) with 'gu' Ending (archaic)";
        case "v2g-s":
            return "Nidan Verb (lower class) with 'gu' Ending (archaic)";
        case "v2h-k":
            return "Nidan Verb (upper class) with 'hu/fu' Ending (archaic)";
        case "v2h-s":
            return "Nidan Verb (lower class) with 'hu/fu' Ending (archaic)";
        case "v2k-k":
            return "Nidan Verb (upper class) with 'ku' Ending (archaic)";
        case "v2k-s":
            return "Nidan Verb (lower class) with 'ku' Ending (archaic)";
        case "v2m-k":
            return "Nidan Verb (upper class) with 'mu' Ending (archaic)";
        case "v2m-s":
            return "Nidan Verb (lower class) with 'mu' Ending (archaic)";
        case "v2n-s":
            return "Nidan Verb (lower class) with 'nu' Ending (archaic)";
        case "v2r-k":
            return "Nidan Verb (upper class) with 'ru' Ending (archaic)";
        case "v2r-s":
            return "Nidan Verb (lower class) with 'ru' Ending (archaic)";
        case "v2s-s":
            return "Nidan Verb (lower class) with 'su' Ending (archaic)";
        case "v2t-k":
            return "Nidan Verb (upper class) with 'tsu' Ending (archaic)";
        case "v2t-s":
            return "Nidan Verb (lower class) with 'tsu' Ending (archaic)";
        case "v2w-s":
            return "Nidan Verb (lower class) with 'u' Ending and 'we' Conjugation (archaic)";
        case "v2y-k":
            return "Nidan Verb (upper class) with 'yu' Ending (archaic)";
        case "v2y-s":
            return "Nidan Verb (lower class) with 'yu' Ending (archaic)";
        case "v2z-s":
            return "Nidan Verb (lower class) with 'zu' Ending (archaic)";
        case "v4b":
            return "Yodan Verb with 'bu' Ending (archaic)";
        case "v4g":
            return "Yodan Verb with 'gu' Ending (archaic)";
        case "v4h":
            return "Yodan Verb with 'hu/fu' Ending (archaic)";
        case "v4k":
            return "Yodan Verb with 'ku' Ending (archaic)";
        case "v4m":
            return "Yodan Verb with 'mu' Ending (archaic)";
        case "v4n":
            return "Yodan Verb with 'nu' Ending (archaic)";
        case "v4r":
            return "Yodan Verb with 'ru' Ending (archaic)";
        case "v4s":
            return "Yodan Verb with 'su' Ending (archaic)";
        case "v4t":
            return "Yodan Verb with 'tsu' Ending (archaic)";
        case "v5aru":
            return "Godan Verb - -aru Special Class";
        case "v5b":
            return "Godan Verb with 'bu' Ending";
        case "v5g":
            return "Godan Verb with 'gu' Ending";
        case "v5k":
            return "Godan Verb with 'ku' Ending";
        case "v5k-s":
            return "Godan Verb - Iku/Yuku Special Class";
        case "v5m":
            return "Godan Verb with 'mu' Ending";
        case "v5n":
            return "Godan Verb with 'nu' Ending";
        case "v5r":
            return "Godan Verb with 'ru' Ending";
        case "v5r-i":
            return "Godan Verb with 'ru' Ending (irregular verb)";
        case "v5s":
            return "Godan Verb with 'su' Ending";
        case "v5t":
            return "Godan Verb with 'tsu' Ending";
        case "v5u":
            return "Godan Verb with 'u' Ending";
        case "v5u-s":
            return "Godan Verb with 'u' Ending (special class)";
        case "v5uru":
            return "Godan Verb - Uru Old Class Verb (old form of Eru)";
        case "vk":
            return "Kuru Verb - Special Class";
        case "vn":
            return "Irregular Nu Verb";
        case "vr":
            return "Irregular Ru Verb, Plain Form Ends with -ri";
        case "vs":
            return "Suru Verb";
        case "vs-c":
            return "Suru Verb - Precursor to Modern Suru";
        case "vs-i":
            return "Suru Verb - Included";
        case "vs-s":
            return "Suru Verb - Special Class";
        case "vz":
            return "Ichidan Verb - Zuru Verb (Alternative Form of -jiru Verbs)";
        default:
            return "Unknown Part of Speech";
    }
    };

    const isOpen = openDropdownId === id;
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <div className="entry">
            {resultType === "kanji" ? (
                <div className='flex max-w-80'>
                    <div className='mx-7'>
                        <p className="text-4xl">{kanjiForms}</p>
                    </div>
                    <div className='text-left text-base'>
                        <p>On readings: {readings_on.join(', ')}</p>
                        <p>Kun readings: {readings_kun.join(', ')}</p>
                        <p>Meanings: {meanings.join(', ')}</p>
                        <p>Strokes: {strokes}, JLPT Level: {jlpt_level}</p>
                    </div>
                </div>
            ) : (
                <div className = 'min-h-24 flex min-w-full justify-between bg-gray-800 pr-5 py-4 rounded-md'>
                    <div className="mx-7 text-left w-72">
                        {kanjiForms.map((word, index) => (
                        <p key={index} className="text-3xl">{word}</p>
                        ))}
                        {kanaReadings.map((word, index) => (
                        <p key={index}  className="text-2xl">{word}</p>
                        ))}
                    </div>
                    <div className= "text-left text-lg  grow">
                        <p>Part of Speech:&nbsp; 
                        {partOfSpeech.map((acronym, index) => (
                            <span key={index}>
                                {partOfSpeechParser(acronym)}
                                {index < partOfSpeech.length - 1 && ', '}
                            </span>
                        ))}</p>
                        <p className = "max-w-5xl">Meaning: {glossDefinitions.join(', ')}</p>
                    </div>
                    {isLoggedIn && source==="searchpage" &&<Options isOpen={isOpen} toggleDropdown={onDropdownToggle} word={kanjiForms[0] || kanaReadings[0]}/>}
                    {isLoggedIn && source === "listspage" && 
                    <button onClick={onRemove} className="bg-red-500 h-[50px] text-white self-center px-4 py-2 rounded hover:text-gray-200 hover:bg-red-600">
                    Remove
                    </button>}
                </div>
            )}
        </div>
    );
};

export default SearchEntry;