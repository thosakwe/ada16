// Simple script to generate TokenType enum

const fs = require('fs');
const path = require('path');

const reservedWords = `
abort
abs
abstract
accept
access
aliased
all
and
array
at
begin
body
case
constant
declare
delay
delta
digits
do
else
elsif
end
entry
exception
exit
for
function
generic
goto
if
in
is
limited
loop
mod
new
not
null
of
or
others
out
package
pragma
private
procedure
protected
raise
range
record
rem
renames
requeue
return
reverse
select
separate
subtype
tagged
task
terminate
then
type
until
use
when
while
with
xor`;

const otherTokens = `
WHITESPACE
DOT
PAREN_L
PAREN_R
SEMI
STRING
IDENTIFIER
`;

var split = (reservedWords + '\n' + otherTokens).split('\n').map(function (str) {
    return str.trim().toUpperCase();
}).filter(function (str) {
    return str.length;
}).sort(function (a, b) {
    return a.localeCompare(b);
});

var text = `
/**
 * The ${split.length} types of tokens accepted by ADA16.
 * @readonly
 * @enum {String}
 */`.trim();

text += '\nmodule.exports = {';

for (var i = 0; i < split.length; i++) {
    text += `\n    ${split[i]}: '${split[i]}'`;

    if (i < split.length - 1)
        text += ',';
    else text += '\n';
}

text += '};';

split = reservedWords.split('\n').map(function (str) {
    return str.trim();
}).filter(function (str) {
    return str.length;
}).sort(function (a, b) {
    return a.localeCompare(b);
});
text += '\n\nmodule.exports.reservedWords = {';

for (i = 0; i < split.length; i++) {
    text += `\n    ${split[i].toUpperCase()}: '${split[i]}'`;

    if (i < split.length - 1)
        text += ',';
    else text += '\n';
}

text += '};';
console.log(text);

const filename = path.join(__dirname, 'lib/src/token-type.js');
fs.writeFile(filename, text, function (err) {
    if (err) {
        console.error(`Couldn't create TokenType enum at '${filename}:`);
        console.error(err);
        process.exit(1);
    } else console.log('Done.');
});