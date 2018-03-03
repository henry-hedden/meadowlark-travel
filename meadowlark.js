#!/usr/bin/env node
/* File:    meadowlark.js
 * Author:  Henry Hedden
 * Created: 2018-02-13
 * Updated: 2018-02-16
 */

var EXPRESS = require('express');
var FORTUNE = require('./lib/fortune.js');
var app = EXPRESS();

// set up handlebars
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(EXPRESS.static(__dirname + '/public'));

app.use(function(req, res, next) {
	res.locals.showTests = app.get('env') !== 'production'
	                               && req.query.test == '1';
	next();
});

app.get('/', function(req, res) {
//	res.type('text/plain');
//	res.send('Meadowlark Travel');
	res.render('home');
});

app.get('/about', function(req, res) {
//	res.type('text/plain');
//	res.send('About Meadowlark Travel');
	res.render('about', {
		fortune: FORTUNE.getFortune(),
		pageTestScript: '/qa/tests-about.js'
	});
});

app.get('/tours/hood-river', function(req, res) {
	res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function(req, res) {
	res.render('tours/request-group-rate');
});

// 404 handler (middleware)
app.use(function(req, res) {
	console.error('404: ' + req.url);
//	res.type('text/plain');
	res.status('404');
//	res.send('404 - Not Found\n\n' + req.url);
	res.render('404');
});

// custom 500
app.use(function(err, req, res, next) {
	console.error(err.stack);
//	res.type('text/plain');
	res.status(500);
//	res.send('500 - Server Error\n\n' + err.stack);
	res.render('500');
});

app.listen(app.get('port'), function() {
	console.log('Express started on http://localhost:' +
	            app.get('port') + '; press Ctrl+C to terminate.');
});

