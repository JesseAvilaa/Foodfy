const express = require('express');
const nunjucks = require('nunjucks');
const server = express();
const receitas = require('./data');

server.use(express.static('public'));
server.set('view engine', 'njk');

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
});

server.get('/', function(req, res){
    return res.render('index', {items: receitas});
});

server.get('/sobre', function(req, res){
    return res.render('sobre');
});

server.get('/receitas', function(req, res){
    return res.render('receitas', {items: receitas} );
});

server.get("/receita", function (req, res) {
    const id = req.query.id;
    const receita = receitas.find(function(receita){
       return receita.id == id;
    });
   
    return res.render('receita', {item: receita});
   
});

server.listen(3331);