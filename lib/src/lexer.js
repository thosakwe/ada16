var Token = require('./token');
var TokenType = require('./token-type');
var reservedKeys = Object.keys(TokenType.reservedWords);
var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
var numeric = '0123456789';

function Lexer() {
}

/**
 * Scans input text and produces a linear stream of tokens.
 * @param text
 * @returns {Array<Token>}
 */
Lexer.prototype.scan = function (text) {
    var tokens = [];
    var line = 1, index = -1;

    for (var i = 0; i < text.length; i++) {
        var potentialTokens = [];
        var ch = text[i];
        index++;

        /// For the sake of readability, 'else if'
        // will NOT be used here. 'continue' is
        // preferred. :)

        // Comments
        if (text.substring(i, i + 2) === '--') {
            while (i < text.length - 1 && text[i + 1] !== '\n') {
                i++;
                index++;
            }

            continue;
        }

        if (ch == '\n') {
            // Todo: Is newline a token type?
            line++;
            index = -1;
            continue;
        }

        // Symbols
        if (ch === ' ') {
            tokens.push(new Token(TokenType.WHITESPACE, ch, line, index));
            continue;
        }

        else if (ch === '.')
            potentialTokens.push(new Token(TokenType.DOT, ch, line, index));
        else if (ch === '(')
            potentialTokens.push(new Token(TokenType.PAREN_L, ch, line, index));
        else if (ch === ')')
            potentialTokens.push(new Token(TokenType.PAREN_R, ch, line, index));
        else if (ch === ';')
            potentialTokens.push(new Token(TokenType.SEMI, ch, line, index));

        // All reserved words
        for (var j = 0; j < reservedKeys.length; j++) {
            var type = reservedKeys[j];
            var matcher = TokenType.reservedWords[type];

            if (text.substring(i, i + matcher.length) === matcher) {
                potentialTokens.push(new Token(type, matcher, line, index));
            }
        }

        // Primitives
        if (ch === '"') {
            var strStr = String(ch);

            for (j = i + 1; j < text.length; j++) {
                var strPeek = text[j];

                if (strPeek !== '\n') {
                    strStr += strPeek;
                    if (strPeek === '"')
                        break;
                } else break;
            }

            potentialTokens.push(new Token(TokenType.STRING, strStr, line, index));
        }

        // Identifier
        if (alpha.indexOf(ch) !== -1 || alpha === '_') {
            var idStr = String(ch);

            for (j = i + 1; j < text.length; j++) {
                var idPeek = text[j];

                if (alpha.indexOf(idPeek) != -1 || numeric.indexOf(idPeek) != -1 || idPeek === '_')
                    idStr += idPeek;
                else break;
            }

            potentialTokens.push(new Token(TokenType.IDENTIFIER, idStr, line, index));
        }

        potentialTokens = potentialTokens.sort(function (a, b) {
            return a.text.length > b.text.length;
        });

        if (potentialTokens.length) {
            var selected = potentialTokens[0];
            i += selected.text.length - 1;
            index += selected.text.length - 1;
            tokens.push(selected);
        }
    }

    return tokens;
};

module.exports = Lexer;