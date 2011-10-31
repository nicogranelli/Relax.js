describe('Example of usage', function(){
  var docs = [];
	
	beforeEach(function(){
		docs = [
			{
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
	});
	it('shoud work ;)', function(){
	
		var rs = relax.map(docs, function(doc){
			doc.country.cities.forEach(function(city){
				emit([doc.country.name, city.name]);
			});
		});
		
		expect(rs.length).toBe(6);
	});
	
});
