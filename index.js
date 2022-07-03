require("dotenv").config();

const path = require("path");
const express = require("express");
const app = express();

const utils = require("./core/utils");

const PORT = process.env.PORT;
const WIKI_FOLDER = process.env.WIKI_FOLDER;

app.set("view engine", "ejs");
app.use("/public", express.static(WIKI_FOLDER));

app.get("/", (req, res) => {
    const context = {}
    context.title_page = "Wiki";

    const active_path = req.query.path ? req.query.path : "/";

    const files = utils.ls(path.join(WIKI_FOLDER, active_path), "md");
    const folders = utils.ls(path.join(WIKI_FOLDER, active_path), false, true);

    context.wiki = {
        active_path: active_path,
        files: files,
        folders: folders,
        wiki: req.query.wiki ? utils.convert_md(utils.read_file(path.join(WIKI_FOLDER, active_path, req.query.wiki))) : "",
        wiki_file: req.query.wiki ? req.query.wiki : ""
    }

    res.render("index", context);
});

app.listen(PORT, () => console.log(`Running on localhost:${PORT}`));