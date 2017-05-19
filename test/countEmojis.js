const tap = require('tap');
const {countEmojis} = require('../index');

tap.equal(countEmojis('hello 😀 world 🤑'), 2);