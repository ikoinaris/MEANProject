const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://john:Fl224Ci3VvYfFrBr@cluster0.fr4p4.mongodb.net/mean-db?retryWrites=true&w=majority",
  {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log("Connection to Database established...")
  })
  .catch((err) => {
    console.log("Connection to Database failed!")
    console.log(err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.post("/api/posts", (req, res, next) => {
    const post = new Post({
      title: req.body.title,
      content: req.body.content
    });
    post.save();
    res.status(201).json({
        message : 'Post added succesfully.'
    });
});

app.use("/api/posts", (req, res) => {
    Post.find().then(documents => {
        res.status(200).json({
          message: 'Posts fetched succesfully!',
          posts : documents
        });
    });
});

module.exports = app;
