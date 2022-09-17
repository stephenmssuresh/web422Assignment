/*********************************************************************************
*  WEB422 – Assignment 2
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Stephen Suresh     Student ID: 117916213       Date: 
*  Cyclic Link: 
*
********************************************************************************/ 

require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require('path');
const app = express();
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();

app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const HTTP_PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(201).json({ message: "API Listening" });
});

app.post("/api/movies", (req, res) => {
  if (!req.body) {
    res.status(204).json({ message: "Nothing in req.body" });
  } else {
    db.addNewMovie(req.body)
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        // res.status(500).json({message : err});
        res.status(500).json({err});
      });
  }
});

app.get("/api/movies", (req, res) => {
  if (!req.query || !req.query.page || !req.query.perPage) {
    res.status(500).json({ message: "Invalid query/parameter entered" });
  } else {
    db.getAllMovies(req.query.page, req.query.perPage, req.query.title)
    .then(
      (data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        // res.status(500).json({message : err});
        res.status(500).json({err});
      });
  }
});

app.get("/api/movies/:id", (req, res) => {
    // no need since req.query error check in above route is good enough
    // if (!req.params) {
    //   res.status(500).json({ message: "No id entered" });
    // } else {
      db.getMovieById(req.params.id)
      .then(
        (data) => {
          res.status(201).json(data);
        })
        .catch((err) => {
        // res.status(500).json({message : err});
        res.status(500).json({err});
        });
    // }
  });
  
  app.put("/api/movies/:id", (req, res) => {
      db.updateMovieById(req.body, req.params.id)
      .then(
        (data) => {
          res.status(201).json(data);
        })
        .catch((err) => {
        // res.status(500).json({message : err});
        res.status(500).json({err});
        });
    // }
  });

  app.delete("/api/movies/:id", (req, res) => {
    db.deleteMovieById(req.params.id)
    .then(
      (data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        // res.status(500).json({message : err});
        res.status(500).json({err});
      });
  // }
});

db.initialize(process.env.MONGODB_CONN_STRING)
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`server listening on: ${HTTP_PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
