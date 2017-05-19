const rule = require('unified-lint-rule');
const visit = require('unist-util-visit');
const toString = require('nlcst-to-string');

const emojiRanges = [
    [parseInt('d80', 16), parseInt('dbff', 16)],
    [parseInt('dc00', 16), parseInt('dfff', 16)]
];

const emojiLimitRule = rule('remark-lint:emoji-limit', (ast, file, options) => {
    const {max} = Object.assign({max: 1}, options);
    visit(ast, 'paragraph', (node) => {
        const count = countEmojis(toString(node));
        if (count > max) {
            file.message(`More than ${max} emoji(s) in a paragraph (${count} found).`, node);
        }
    });
});

function countEmojis(str) {
    let cp = null;
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        cp = str.codePointAt(i);
        emojiRanges.forEach(range => {
            if (cp >= range[0] && cp <= range[1]) {
                count++;
            }
        });
    }
    return count;
}

module.exports = emojiLimitRule;
module.exports.countEmojis = countEmojis;