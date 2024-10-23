const fs = require('fs');
const { TextDecoder } = require('util');
const path = require('path');

// Path to your RADKFILE (encoded in EUC-JP)
const radkfilePath = path.join(__dirname, 'radkfile');

// Function to read the file and decode it from EUC-JP to UTF-8
function readRadkfile() {
    // Read the file as a binary Buffer
    const eucJpBuffer = fs.readFileSync(radkfilePath);

    // Create a TextDecoder for EUC-JP
    const decoder = new TextDecoder('euc-jp');

    // Decode the binary Buffer into a UTF-8 string
    const utf8String = decoder.decode(eucJpBuffer);

    return utf8String;
}

// Function to parse the RADKFILE data
function parseRadkfile(data) {
    const radkData = {};
    let currentRadical = null;
    const lines = data.split('\n');

    lines.forEach(line => {
        line = line.trim();

        // Skip comment lines
        if (line.startsWith('#') || line === '') {
            return;
        }

        // If the line starts with '$', it indicates a new radical
        if (line.startsWith('$')) {
            const [radical] = line.split(' ').slice(1);
            currentRadical = radical;
            radkData[currentRadical] = [];
        } else if (currentRadical) {
            // If it's a kanji line, add kanji to the current radical's list
            radkData[currentRadical].push(...line.split(''));
        }
    });

    return radkData;
}

// Function to get kanji by radical
function getKanjiByRadical(radical, radkData) {
    return radkData[radical] || [];
}

// Main function to read, convert, parse, and fetch kanji
function main() {
    const utf8Data = readRadkfile();  // Read and decode the RADKFILE
    const radkData = parseRadkfile(utf8Data);  // Parse the file

    // Specify the radical you want to search for (e.g., '一')
    const radical = '無';
    const kanjiList = getKanjiByRadical(radical, radkData);

    console.log(`Kanji associated with the radical "${radical}":`);
    console.log(kanjiList.join(' '));
}

// Run the main function
main();

//kanji stroke count checked by 