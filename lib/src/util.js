var Lexer = require('./lexer');

exports.parseCompilationUnit = function (text) {
    var lexer = new Lexer();
    var tokens = lexer.scan(text);
};