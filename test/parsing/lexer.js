const Lexer = require('../../lib/src/lexer');
const mocha = require('mocha');

const lexer = new Lexer();
const source = `
with Ada.Text_IO;

procedure Hello is
begin
   Ada.Text_IO.Put_Line("Hello, world!");
end Hello;
`;
const tokens = lexer.scan(source);
console.log(tokens);