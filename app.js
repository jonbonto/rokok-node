const express = require('express');
const bodyParser= require('body-parser')
const app = express();
var mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'ejs')
var db
MongoClient.connect("your-mongo-link", (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
  
})
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})
app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
  
})

app.get('/rokoks', (req, res) => {
  db.collection('rokoks').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('rokok.ejs', {rokoks: result})
  })
})

app.get('/deleterokok/:id', (req, res) => {
  db.collection('rokoks').deleteOne( { _id:mongodb.ObjectID(req.params.id)},  (err, result)=>{
    if (err) return console.log(err)
    console.log('delete')
    res.redirect('/rokoks')
  })
})

app.post('/rokoks', (req, res) => {
  db.collection('rokoks').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/rokoks')
  })
  
})