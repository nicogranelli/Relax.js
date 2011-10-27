Relax.js
==================================================

What is it?
-----------

Relax.js is a way to have map and reduce couchdb like functions in the browser. 

Whay is not?
------------

Relax.js don't connect with couchdb, don't execute views or anything like that (use $.couch for kind of things).

So, when should I use it?
-------------------------

There are times when you have been writing and debuging couchdb views all day. Then, you face a problem in your
client code, and think that having a map function just like the one in couchdb will solve the problem. Well, you have Relax.js for that :)

Examples
--------

###The docs: 
```javascript
var docs =[{
		country:{
			name:"Italy",
			cities:[
				{
					name:'Rome'
				},
				{
					name:'Milan'
				},
				{
					name:'Venezia'
				},
			]
		},
	},
	{
		country:{
			name:"Spain",
			cities:[
				{
					name:'Madrid'
				},
				{
					name:'Barcelona'
				},
				{
					name:'Sevilla'
				},
			]
		}
	}
];
```

So, we have 2 documents, each with a country object, and inside that object a name and an array of cities. 

###The map function

```
	relax.map(docs, function(doc){
		doc.country.cities.forEach(function(city){
			emit([doc.country.name, city.name]);
		});
	});
```

Here we emit once for every city, where the emitted key is an array containing the country name and the city name

###Result

k : ["Italy", "Rome"], v: null

k : ["Italy", "Milan"], v: null

k : ["Italy", "Venezia"], v: null

k : ["Spain", "Madrid"], v: null

k : ["Spain", "Barcelona"], v: null

k : ["Spain", "Sevilla"], v: null

###Emiting values

We a little change in the map function: 

```
	relax.map(docs, function(doc){
		doc.country.cities.forEach(function(city){
			emit(doc.country.name, city.name]);
		});
	});
```

the result will be:

k : "Italy", v: "Rome"

k : "Italy", v: "Milan"

k : "Italy", v: "Venezia"

k : "Spain", v: "Madrid"

k : "Spain", v: "Barcelona"

k : "Spain", v: "Sevilla"

Features:
--------

* couchdb like map
* couchdb like reduce (no docs yet, but you can explore the tests

ToDo:
-----

* Make the results for both function get sorted just like couchdb would sort them
* There are more ToDo tasks in the issues
