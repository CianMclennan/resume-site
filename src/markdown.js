const MarkdownIt = require('markdown-it');
const mdContainers = require('markdown-it-container');

const md = MarkdownIt({
    html: true,        // Enable HTML tags in source
    xhtmlOut: false,        // Use '/' to close single tags (<br />).
    // This is only for full CommonMark compatibility.
    breaks: false,        // Convert '\n' in paragraphs into <br>
    langPrefix: 'language-',  // CSS language prefix for fenced blocks. Can be
    // useful for external highlighters.
    linkify: false,        // Autoconvert URL-like text to links

    // Enable some language-neutral replacement + quotes beautification
    // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
    typographer: false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '“”‘’',

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externally.
    // If result starts with <pre... internal wrapper is skipped.
    highlight: function (/*str, lang*/) { return ''; }
}).use(mdContainers, 'section', {
    render(tokens, idx) {
        const m = tokens[idx].info.trim().match(/^section\s+(.*)$/)

        if (tokens[idx].nesting === 1) {
            // opening tag
            return `<section id="${md.utils.escapeHtml(m[1])}">\n`
        }
        // closing tag
        return '</section>\n'
    },
});

module.exports = md;