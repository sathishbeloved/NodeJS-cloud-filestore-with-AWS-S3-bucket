const express = require("express");
const router = express.Router();
const { unlinkSync } = require("fs");
const path = require("path");

const upload = require("../utils/multer");
const AWS = require("../utils/index");

router.get("/", async (req, res) => {
  res.render("index", { title: "Online Cloud Storage System" });
});

router.get("/list", async (req, res) => {
  try {
    let list = await AWS.list();

    res.render("list", {
      bucketList: list.Contents,
    });
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/upload", upload, async (req, res) => {
  try {
    let file = req.file.filename;
    let awsRes = await AWS.upload(
      path.resolve("./") + "/uploads/" + file,
      file
    );
    await unlinkSync(path.resolve("./") + "/uploads/" + file);
    res.render("DeleteSuccess", {
      title: "File Uploaded sucessfully",
    });
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/delete/:filename", async (req, res) => {
  try {
    await AWS.deleteFile(req.params.filename);

    res.render("DeleteSuccess", {
      title: "File deleted sucessfully",
    });
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/rename/:oldname", async (req, res) => {
  res.render("rename", {
    title: "Enter the new name of the file",
    oldname: req.params.oldname,
  });
});

let oname;
let nname;
router.post("/rename/:oldname/succ", async (req, res, next) => {
  oname = req.params.oldname;
  nname = req.body.newname;
  res.redirect(`/rename/${oname}/${nname}`);
});

router.get("/rename/:oldname/:newname", async (req, res) => {
  try {
    await AWS.renameFile(req.params.oldname, req.params.newname);
    let list = await AWS.list();
    res.render("DeleteSuccess", {
      title: "File renamed sucessfully",
    });
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/redirect", async (req, res) => {
  res.redirect("/");
});

module.exports = router;
