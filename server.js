var express = require('express');
var path = require('path');
var app = express();
var session = require('express-session');
var datetime = require('node-datetime')
app.use(session({
	secret: 'keyboard',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
	
}));


var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join (__dirname, './static')));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req,res)
{
	if(!req.session.gold_amt)
	{
		req.session.gold_amt =0;
		
	}
	if(!req.session.activities)
	{
		req.session.activities =[];
	}	

	gold_amt = req.session.gold_amt;
	res.locals.activities = req.session.activities;
	
	res.render("ninjagold");
});


app.get('/clear', function(req,res){
	req.session.destroy();
	res.redirect("/");
});

app.post('/process_money', function(req,res){
	var gold = 0;
	var sum = 0;
	var gold_amt = 0;
	if(!req.session.activities){
		req.session.activities = [];
	}
	var dt = datetime.create();
	var formatted_date = dt.format('m/d/Y H:M:S');
	console.log(formatted_date);
	var activity = {};
	var str ="";
	var color ="";


	
	if(req.body.button === "Farm"){

		gold += Math.floor((Math.random()*20)+10);
		// gold_amt += gold
		if (sum != 0){
			var sum =0;
		}
		sum = req.session.gold_amt;
		sum += gold;

		req.session.gold_amt = sum;

	}if(req.body.button === "Cave"){

		gold += Math.floor((Math.random()*10)+5);
		// gold_amt += gold
		if (sum != 0){
			var sum =0;
		}
		sum = req.session.gold_amt
		sum += gold

		req.session.gold_amt = sum;

	}if(req.body.button === "House"){

		gold += Math.floor((Math.random()*5)+2);
		// gold_amt += gold
		if (sum != 0){
			var sum =0;
		}
		sum = req.session.gold_amt
		sum += gold

		req.session.gold_amt = sum;

	}if(req.body.button === "Casino"){

		gold += Math.floor((Math.random()*100)-50);
		console.log(gold);
		// gold_amt += gold
		if (sum != 0){
			var sum =0;
		}
		sum = req.session.gold_amt
		sum += gold

		req.session.gold_amt = sum;

	}


	if(gold<0){		
		activity.str = "You have entered a "+req.body.button +" and lost "+gold*-1+" gold...Ouch. ("+ formatted_date+")";
		activity.color = "red";
	}else{
		activity.str = "You have entered a "+req.body.button +" and earned "+gold+" gold. ("+ formatted_date+")";
		activity.color = "green";
	}
	var a = req.session.activities;
	// console.log(a);

	a.push(activity);
	req.session.activities = a;

	res.locals.activities = req.session.activities;
	res.locals.gold_amt = req.session.gold_amt;

	// console.log(req.session.activities);
	// console.log(req.session.gold_amt);

	res.redirect('/');
});








app.listen(8000, function(){
	console.log("listening on port 8000");
});