const { promises: {
    readFile,
    writeFile,
}} = require('fs');
const path = require('path');
const md = require('./markdown');

const baseFilePath = path.join(__dirname, 'index.html');
const mdFilePath = path.join(__dirname, 'index.md');

Promise.all([
    readFile(baseFilePath),
    readFile(mdFilePath),
])
.then((fileBuffers) => {
    const [baseFile, mdFile] = fileBuffers.map(String);
    const outFile = baseFile.replace('{ markdown }', md.render(mdFile));
    writeFile('build/index.html', outFile);
})
.catch(error => {
    console.error(error.message);
    process.exit(1);
});
