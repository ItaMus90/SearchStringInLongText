const Aggregator = require('./aggregator');

class Matcher {
    #lastCharOffset;
    #lastLinesSize;

    constructor() {
        this.#lastCharOffset = 0;
        this.#lastLinesSize = 0;
        this.aggregator = new Aggregator();
    }

    findMatchWords(lines, searches){
        let listWords = [];

        for (let lineIndex = 0; lineIndex < lines.length; lineIndex++){
            listWords = lines[lineIndex];
            const wordsArr = listWords.split(' ');
            let word = '';

            for (let i = 0; i < wordsArr.length; i++) {
                word = wordsArr[i];
                if (searches.includes(word)){
                    let currentCharOffset =  this.calculateCharOffset(lines, lineIndex - 1);
                    currentCharOffset += lines[lineIndex].indexOf(word);
                    lines[lineIndex] = lines[lineIndex].replace(word, this.editMatchesWord(word));

                    if (!this.aggregator.map[word]){
                        this.aggregator.map[word] = [];
                        this.aggregator.map[word].push({lineOffset: lineIndex + 1 + this.#lastLinesSize, charOffset: this.#lastCharOffset + currentCharOffset});
                    }else{
                        this.aggregator.map[word].push({lineOffset: lineIndex + 1 + this.#lastLinesSize, charOffset: this.#lastCharOffset + currentCharOffset});
                    }
                }
            }
        }

        this.#lastLinesSize += lines.length;
        this.#lastCharOffset += this.calculateCharOffset(lines, lines.length - 1);
    }

    calculateCharOffset(lines, currentLine){
        return currentLine <= 0 ? 1 : lines.slice(0, currentLine).join('').length;
    }

    editMatchesWord(word){
        let newWord = '';
        for (let i = 0; i < word.length; i++) {
            newWord += '~';
        }
        return newWord
    }
}

module.exports = Matcher;