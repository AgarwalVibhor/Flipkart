(function(){

	var fs = require('fs');
	var path = require('path');
	var express = require('express');
	var app = express();
	app.use(express.static(path.join(__dirname, 'public')));
	var bodyParser = require('body-parser');
	var nedb = require('nedb'), database = new nedb({filename : 'flipkart.db', autoload : true});
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended : true}));

	app.get('/getCategory', function(req, res){

		fs.readFile('./items.json', 'utf8', function(err, data){
			if(err) throw err;
			res.send(data);
		});
	});

	app.get('/getShoesBrands', function(req, res){

		fs.readFile('./items.json', 'utf8', function(err, data){
			if(err) throw err;
			res.send(data);
		});
	});

	app.get('/getBrands', function(req, res){
		var obj;
		var result = {};
		result['brands'] = [];
		fs.readFile('./items.json', 'utf8', function(err, data){
			if(err) throw err;
			obj = JSON.parse(data);
			for(var i = 0; i < obj[req.query.name].length; i++)
			{
				result['brands'].push(obj[req.query.name][i]);
			}
			res.send(JSON.stringify(result));
		});
	});

	app.get('/getFormalShoesImages', function(req, res){
		var obj;
		var products = {};
		products['images'] = [];
		fs.readFile('./formal_shoes.json', 'utf8', function(err, data){
			if(err) throw err;
			obj = JSON.parse(data);
			for(var i = 0; i < obj[req.query.shoesBrand].length; i++)
			{
				products['images'].push(obj[req.query.shoesBrand][i]);
			}
			res.send(JSON.stringify(products));
		});
	});

	app.get('/getSportsShoesImages', function(req, res){
		var obj;
		var products = {};
		products['images'] = [];
		fs.readFile('./sports_shoes.json', 'utf8', function(err, data){
			if(err) throw err;
			obj = JSON.parse(data);
			for(var i = 0; i < obj[req.query.shoesBrand].length; i++)
			{
				products['images'].push(obj[req.query.shoesBrand][i]);
			}
			res.send(JSON.stringify(products));
		});
	});

	app.get('/getProductImages', function(req, res){
		var name = null;
		var obj;
		var products = {};
		products['images'] = [];
		if(req.query.name == "smartphones")
			name = './smartphones.json';
		else
			name = './watches.json';
		fs.readFile(name, 'utf8', function(err, data){
			if(err) throw err;
			obj = JSON.parse(data);
			for(var i = 0; i < obj[req.query.brand].length; i++)
			{
				products['images'].push(obj[req.query.brand][i]);
			}
			res.send(JSON.stringify(products));
		});
	});

	app.get('/getAllShoes', function(req, res){
		var obj;
		var product = {};
		product['details'] = [];
		fs.readFile('./sports_shoes.json', 'utf8', function(err, data){
			obj = JSON.parse(data);
			for(var i = 0; i < obj[req.query.brand].length; i++)
			{
				product['details'].push(obj[req.query.brand][i]);
			}	
			fs.readFile('./formal_shoes.json', 'utf8', function(err, data){  //Note : This readFile should be within the previous readFile.
			obj = JSON.parse(data);
			for(var i = 0; i < obj[req.query.brand].length; i++)
			{
				product['details'].push(obj[req.query.brand][i]);
			}
			res.send(JSON.stringify(product));
			});
		});
	});

	app.listen(process.env.PORT || 8088);
	console.log("Server is listening");
})();