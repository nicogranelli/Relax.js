describe('', function(){
  var ciudades = [];
	
	beforeEach(function(){
		ciudades = 
		  [
			{
			  ciudad:"Carlos paz",
			  zonas:["z3", "z2", "z1"]
			}
		];
	});
		
	it('Should order by value if key are equal', function(){
		var result=relax.map(ciudades, 
		function(ciudad, emit){
			ciudad.zonas.forEach(function(zona){
				emit(ciudad.ciudad, zona);  
			});
		});
		
		expect(result).toEqual(
			[{
				key:"Carlos paz", value:"z1"
			},{
				key:"Carlos paz", value:"z2"
			},{
				key:"Carlos paz", value:"z3"
			},]
		);
	});
		
	it('Should order all the elements of the key array', function(){
		var result=relax.map(ciudades, 
		function(ciudad, emit){
			ciudad.zonas.forEach(function(zona){
				emit([ciudad.ciudad, zona]);  
			});
		});
		
		expect(result).toEqual(
			[{
				key:["Carlos paz", "z1"], value:null
			},{
				key:["Carlos paz", "z2"], value:null
			},{
				key:["Carlos paz", "z3"], value:null
			},]
		);
	});
		
	it('Should order in the reduce too', function(){
		var result=relax.map(["b", "a", "b", "c","c","c","c",], 
		function(letter){
			emit(letter, 1);
		});
		
		result = relax.reduce(result, function(key, values){
			return sum(values);
		});
		
		expect(result).toEqual(
			[ { key : 'a', value : 1 }, { key : 'b', value : 2 }, { key : 'c', value : 4 } ]
		);
	});
		
	it('Should order without calling map first', function(){		
		var handMapped = [{
			key:"b", value:1
		},{
			key:"a", value:1
		},{
			key:"c", value:1
		},{
			key:"b", value:1
		},]
		var result = relax.reduce(handMapped, function(key, values){
			return sum(values);
		});
		
		expect(result).toEqual(
			[ { key : 'a', value : 1 }, { key : 'b', value : 2 }, { key : 'c', value : 1 } ]
		);
	});

});