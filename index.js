require("dotenv").config();

const path = require("path");
const express = require("express");
const bodyParser = require('body-parser');

const app = express();

const utils = require("./core/utils");

const PORT = process.env.PORT || process.env.DEFAULT_PORT;
const WIKI_FOLDER = process.env.WIKI_FOLDER;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use("/public", express.static(WIKI_FOLDER));
app.use("/static", express.static(path.join(__dirname, "public")));

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
        wiki_file_name: req.query.wiki ? req.query.wiki : "",
        converted: req.query.wiki ? utils.convert_md(utils.read_file(path.join(WIKI_FOLDER, active_path, req.query.wiki))) : "",
        origin: req.query.wiki ? utils.read_file(path.join(WIKI_FOLDER, active_path, req.query.wiki)) : ""
    }

    res.render("index", context);
});

app.post("/", (req, res) => {
    utils.write_file(path.join(WIKI_FOLDER, req.query.path, req.query.wiki), req.body.editor);
    res.redirect(`/?path=${req.query.path}&wiki=${req.query.wiki}`);
});

app.listen(PORT, () => console.log(`Running on localhost:${PORT}`));