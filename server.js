/*const EventEmitter = require('events');

let monEcouteur = new EventEmitter();
monEcouteur.on('sauter', function () {
    console.log('sauté');
});
monEcouteur.emit('sauter');
monEcouteur.emit('sauter');*/
/*var http = require('http');
var fs = require('fs');
var url = require('url');

var server = http.createServer(function(req, res) {
  res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
  var query = url.parse(req.url, true).query;
  var nom = query.nom;
  /*if (query.nom === undefined){
      res.write('bonjour anonyme');
  }
  else {
      res.write('bonjour '+ query.nom);
  }
  res.end();*/

  /*fs.readFile('corps.html', 'utf8', function (err,html){
    if(err){
        res.writeHead(500,{"Content-type": "text/plain"});
        res.write('500');
        res.end();
    }
    res.writeHead(200,{"Content-type": "text/html; charset=utf-8"});
    html = html.replace('{{ nom }}', nom)
    res.write(html);
    res.end();
});
});
server.listen(8080);*/
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let session = require('express-session');


// ejs c'est le moteur de template utilisé
app.set('view engine', 'ejs');


//le middleware
//Pour servir des fichiers statiques (images, fichiers CSS, JavaScript), 
//utilisez la fonction express.static dans Express.
app.use('/static', express.static('public'));
// '/static'  est un préfixe de chemin d’accès virtuel 

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(session({
    secret: 'aaaa',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false}
}));

app.use(require('./middlewares/flash'));

//Routes
app.get('/', function(req, res){
    //console.log(req.session);
    console.log(req.session.cookie.path);
    res.render('pages/index');    
});
app.get('/contact', function(req, res){
    //console.log(req.session);
    console.log(req.session.cookie.path);
    res.render('pages/contact.ejs');
})
app.get('/activite', function(req, res){
    //console.log(req.session);
    console.log(req.session.cookie.path);
    res.render('pages/activite.ejs');
})
app.post('/', function(req, res){
    if(req.body.message == undefined || req.body.message ==''){
        // res.render('pages/index', {error: "Vous n'avez pas entré un message"});
         //req.session.error= "Vous n'avez pas entré un message";
         req.flash('error', "Vous n'avez pas entré un message");
    }
    else{
        let Message = require('./models/message');
        Message.create(req.body.message, function(){
            req.flash('success', "Bien");
        })
    }
    res.redirect('/');
});
app.listen(8080);