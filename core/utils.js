const fs = require("fs");
const path = require("path")
const markdown = require("markdown").markdown;

const read_file = file => fs.readFileSync(file).toString();

const ls = (dir, extname=false, isFolder=false) => {
    let data = fs.readdirSync(dir);
    data.sort((a, b) => a.localeCompare(b));
    if (extname && !isFolder)
        data = data.filter(e => path.extname(e) == `.${extname}`);
    else if (!extname && isFolder)
        data = data.filter(e => fs.statSync(path.join(dir, e)).isDirectory());
    return data;
}

const convert_md = string => markdown.toHTML(string);

module.exports = {read_file, ls, convert_md}