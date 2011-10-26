describe('', function(){
	var ciudades = [];
	
	beforeEach(function(){
		ciudades = 
		  [
			{
			  ciudad:"Carlos paz",
			  zonas:["z1", "z2"]
			}
		];
	});


	it('should not mutate original collection', function(){
		var col = [{"some":"value"}];
		relax.reduce(col, 
			function(key, values){
				key='';
				values=[];
				return values;
			});
		
		expect(col).toEqual([{"some":"value"}]);
	});
	
  
	it('example for web site XXX', function(){
		var data = [ 'jan piet klaas', 'piet klaas', 'japie' ],
			result=relax.map(data, 
			function(item, emit){
				var splitted = item.split(/\s/g);
				for(var word in splitted) {
					// the 'emit' function is used to yield the new items
					// syntax: emit (key, value);
					emit(splitted[word], 1);
				}
			});
		expect(result).toEqual(
			[ 
				{ key : 'jan', value : 1 }, 
				{ key : 'piet', value : 1 }, 
				{ key : 'klaas', value : 1 }, 
				{ key : 'piet', value : 1 }, 
				{ key : 'klaas', value : 1 }, 
				{ key : 'japie', value : 1 } 
			]);
			
		result = relax.reduce(result, function(key, values){
			return sum(values);
		});
			
		expect(result).toEqual([ 
			{ key : 'jan', value : 1 }, 
			{ key : 'piet', value : 2 }, 
			{ key : 'klaas', value : 2 }, 
			{ key : 'japie', value : 1 } 
		]);
	});
  
});