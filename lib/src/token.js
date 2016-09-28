var Location = require('./location');

/**
 * Represents a context-free Ada source element.
 * @param type {String} This token's type.
 * @param text {String} This token's source text.
 * @param line {Number} The line in which this token is found.
 * @param index {Number} The index within the line of this token's first character.
 * @constructor
 */
function Token(type, text, line, index) {
    this.type = type;
    this.text = text;
    this.loc = new Location(line, index);
}

module.exports = Token;