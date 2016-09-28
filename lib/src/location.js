/**
 * Represents the location of a source element within text.
 * @param line {Number} The line the corresponding element is found in.
 * @param index {Number} The index within the line pointing to the first character of the element.
 * @constructor
 */
function Location(line, index) {
    this.line = line;
    this.index = index;
}

module.exports = Location;