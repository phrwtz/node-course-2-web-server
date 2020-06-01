const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(process.cwd() + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
 var now = new Date().toString();
 var log = `${now}; ${req.method} ${req.url}`;
 console.log(log);
 fs.appendFile('server.log', log + '\n', (err) => console.log('Unable to append to server.log'))
 next();
});

/* app.use((req, res, next) => {
 res.render('maintenance.hbs');
}); */

app.use(express.static(process.cwd() + '/public'));

hbs.registerHelper('getCurrentYear', () => {
 return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (txt) => {
 return txt.toUpperCase();
});

app.get('/', (req, res) => {
 res.render('home.hbs', {
  pageTitle: 'Home Page',
  welcomeMessage: 'Welcome to my website!'
 });
});

app.get('/about', (req, res) => {
 res.render('about.hbs', {
  pageTitle: 'About page'
 });
});

app.get('/bad', (req, res) => {
 res.send({
  errorMessage: 'Unable to handle request'
 })
})



app.listen(port, () => {
 console.log(`Server is up on port ${port}`)
});