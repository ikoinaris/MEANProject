const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://john:Fl224Ci3VvYfFrBr@cluster0.fr4p4.mongodb.net/test?retryWrites=true&w=majority",
  {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log("Connected to Database")
  })
  .catch(() => {
    console.log("Connection failed!")
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
    console.log(post);
    res.status(201).json({
        message : 'Post added succesfully.'
    });
});

app.use("/api/posts", (req, res, next) => {
    const posts = [
        {
            id : 'f8nvv73n4v9',
            title: 'First server-side post',
            content: 'This is coming from the server'
        },
        {
            id : 'fheufh394zt39h',
            title: 'Second server-side post',
            content: 'This is coming from the server!'
        }
    ];
    res.status(200).json({
        message: 'Posts fetched succesfully!',
        posts : posts
    });
    next();
});

module.exports = app;
