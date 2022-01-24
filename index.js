const http = require('http');
const express = require('express');

const mongoose = require('mongoose');
const endpoints = require('./endpoints');
// const dataSources = require('./datasources');
const bodyParser = require('body-parser')

mongoose.connect('mongodb+srv://xlsKite:xlsKite96258992@cluster0.att3q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

const app = express();
const port = 3000;
const server = http.createServer(app);
const startedAt = new Date();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.set('db',  mongoose)

endpoints(app);
// index endpoint
app.get('/', (req, res) => {
  const currentDateTime = new Date();
  res.status(200).json({
    started: startedAt.toISOString(),
    uptime: currentDateTime.getTime() - startedAt.getTime(),
  });
});

server.listen(port, (err) => {
  if (err) {
    console.error('Unable to listen for connections', err);
    process.exit(1);
  }
  if(!mongoose) {
    console.log("MongoDB connection error. Please make sure that MongoDB is running.");
    process.exit(1);
  }

  console.log('started at', startedAt.toISOString());
  console.log('running on port', port);
});


// module.exports = server;
